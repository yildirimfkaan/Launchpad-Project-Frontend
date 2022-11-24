import React, { useState } from 'react';
import { getProjectByID } from '../../store/project/projectActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setWalletAccountData } from '../../store/wallet/walletActions';
import { Button, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { checkAllConditionForStake } from '../../helpers/verificationHelper';
import wallet from '../../helpers/wallet';
import detectEthereumProvider from '@metamask/detect-provider';
import './ProjectDetail.scss';
import UPProjectInfo from '../../components/UPProjectInfo/UPProjectInfo';
import UPIcons from '../../components/UPIcons/UPIcons';
// import { swapTokenModalAction } from '../../store/project/projectActions';
import { buyTokenModalAction } from '../../store/token/tokenActions';
import UPBuyTokenModal from '../../components/UPBuyTokenModal/UPBuyTokenModal';
import ProjectFlow from '../../components/UPProjectFlow/ProjectFlow';
import SpinnerUnopad from '../../components/UPSpinnerUnopad/UPSpinnerUnopad';

function ProjectDetail({ ...props }) {
  const { project, provider, accounts, ethereum, setWalletAccount, user, buyTokenModalRequest } =
    props;
    
  const item = props.project;

  const [stake, setStake] = useState(false);

  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState();

  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState();

  // const tokenAddress = '0xa4f07529ce9119ab60d4da69fb8cc28ea6bc6f25';
  // const tokenSymbol = 'DUNOT';
  // const tokenDecimals = 4;
  const stakeSetup = () => {
    setStake(true);
  };
  const handleShow = () => {
    buyTokenModalRequest(true);
  };
  const connectWallet = async () => {
    wallet.connectWallet();
  };
  console.log("itemsss",item)
  const addUnoTokenFunction = async () => {
    try {
      const provider = await detectEthereumProvider();
      const wasAdded = await provider.sendAsync({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: item.token.address,
            symbol: item.token.symbol,
            decimals: item.token.decimals,
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('UnoToken has not been added');
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  const refreshState = () => {
    // setWalletAccount(null);
    setChainId();
    // setNetwork('');
    setMessage('');
    setSignature('');
    setVerified(undefined);
  };

  const disconnect = async () => {
    wallet.disconnectWallet();
  };
 
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (newAccounts) => {
        if (accounts?.[0] !== newAccounts?.[0]) setWalletAccount(newAccounts);
      };
      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider]);

  useEffect(() => {
    const payload = {
      id: props.match.params.id,
    };
    props.getProjectByID(payload);

    return () => {};
  }, []);

  return (
    <>
      {!project ? (
        <SpinnerUnopad/>
      ) : (
        <Container className="mt-5 px-5">
          <Row>
            <Card className="project-detail-card col-md-12 col-sm-12">
              <Card.Header className="bg-white">
                <div
                  className="project-detail-name-div d-flex justify-content-between 
              align-items-center col-md-6 col-sm-4" 
                >
                  {' '}
                  <Row className=''>
                    <div>
                      <img
                        alt="project_logo"
                        src={process.env.REACT_APP_API_URL + '/projects/' + item.id + '/logo'}
                        height={92} width={92}
                      />
                    </div>
                  </Row>
                  
                  <Row className="col-md-12 col-lg-12 mx-0">
                    <Card.Title className="text-fs-head-lg"> {item.name}</Card.Title>
                    <Card.Text className="text-fs-body-sm">{item.token.symbol}</Card.Text>
                  </Row>
                </div>
                <div className="project-detail-price-div">
                  <Card.Text className="text-fs-body-sm mb-0">PRICE</Card.Text>
                  <Card.Title className="text-fs-head-md 
                  mb-0">${item.token.price_in_usd}</Card.Title>
                  <Card.Text className="text-fs-body-md">{item.token.price_in_uno} UNO</Card.Text>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="project-detail-name-div">
                  <Card.Text className="text-fs-body-md">Round</Card.Text>

                  <Card.Title className="text-fs-head-md">{item.active_round}</Card.Title>
                </div>
                {/* {new Date(item.round_sale.start_date).toLocaleDateString()}
                { }
                {(item.round).map ((rounds,index) => {
                  console.log(rounds)
                  // if (rounds){
                  //   if rounds.end_date < 
                  // }
                })} */}
                <div className="project-detail-price-div">
                  <Card.Text className="text-fs-body-md">Time Left</Card.Text>
                  <Card.Title className="text-fs-head-md">{item.round_time_left}</Card.Title>
                </div>
                {/* <Card.Title>{item.project_name}</Card.Title>
                  <Card.Text>{item.project_sale_type}</Card.Text>
                  <Card.Text>{item.project_explanation_text}</Card.Text> */}

                <span>{error ? error.message : null}</span>
              </Card.Body>

              <div>
                {/* <ProgressBar now={item.project_percent_raised} /> */}
                <ProgressBar
                  className="project-progress-bar mt-3 mb-3 mx-2"
                  style={{ height: '30px' }}
                  now={85}
                  label={'Sale: 92.45% '}
                />
              </div>
              <Card.Body className="project-detail-card-body">
                <div className="project-detail-name-div">
                  <Card.Text>TOKEN DISTRIBUTION</Card.Text>
                  <Card.Title className='text-fs-head-md'>
                    {item.token.distribution}
                    
                    </Card.Title>
                </div>

                <div className="project-detail-price-div">
                  <Card.Text>TOTAL RAISED</Card.Text>
                  <Card.Title>${item.total_tokens_sold}/${item.total_raised}</Card.Title>
                </div>

                <span>{error ? error.message : null}</span>
              </Card.Body>
              <Card.Footer className="bg-white">
                <div className="project-detail-footer-left-div">
                  <Card.Title>Want to buy {item.token.symbol} token ?</Card.Title>
                </div>
                <div className="project-detail-footer-right-div">
                  <Button variant="primary" onClick={addUnoTokenFunction} className="mx-2">
                    Add {item.token.symbol}{' '}
                  </Button>
                  {checkAllConditionForStake(user, accounts) ? (
                    <Button
                      variant="primary"
                      onClick={() => {
                        stakeSetup();
                        handleShow();
                      }}
                    >
                      Buy {item.token.symbol}
                    </Button>
                  ) : (
                    <Button variant="primary" disabled={true}>
                      Buy {item.token.symbol}
                    </Button>
                  )}
                </div>
              </Card.Footer>
            </Card>
          </Row>

          {checkAllConditionForStake(user, accounts) && (
            <div className="mt-3">
              <Row>
                <Col>
                  <div className="border rounded p-2">
                    <div className="d-flex align-items-center border-bottom-0">
                      <UPIcons
                        name={user ? 'MdDone' : 'MdPriorityHigh'}
                        color={user ? '#28a745' : '#ffc107'}
                        size="24"
                      />
                      <span className="h6 mb-0 mx-auto">Account Enabled</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="border rounded p-2">
                    <div className="d-flex align-items-center border-bottom-0">
                      <UPIcons
                        name={accounts ? 'MdDone' : 'MdPriorityHigh'}
                        color={accounts ? '#28a745' : '#ffc107'}
                        size="24"
                      />
                      <span className="h6 mb-0 mx-auto">Wallet Enabled</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="border rounded p-2">
                    <div className="d-flex align-items-center border-bottom-0">
                      <UPIcons
                        name={user ? 'MdDone' : 'MdPriorityHigh'}
                        color={user ? '#28a745' : '#ffc107'}
                        size="24"
                      />
                      <span className="h6 mb-0 mx-auto">Mail Verified</span>
                    </div>
                  </div>
                </Col>
              </Row>

              {checkAllConditionForStake(user, accounts) && stake ? (
                <UPBuyTokenModal />
              ) : (
                <div></div>
              )}
            </div>
          )}
           <ProjectFlow {...props}/>
          <UPProjectInfo {...props}/>
        </Container>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    provider: state.walletReducer.provider,
    ethereum: state.walletReducer.ethereum,
    accounts: state.walletReducer.accounts,
    user: state.userReducer.user,
    project: state.projectReducer.project,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // connectWalletRequest: (payload) => {
    //   dispatch(connectWallet(payload));
    // },
    setWalletAccount: (payload) => {
      dispatch(setWalletAccountData(payload));
    },
    getProjectByID: (payload) => {
      dispatch(getProjectByID(payload));
    },
    buyTokenModalRequest: (payload) => {
      dispatch(buyTokenModalAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
