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
import { swapTokenModalAction } from '../../store/project/projectActions';
import UPSwapTokenModal from '../../components/UPSwapTokenModal/UPSwapTokenModal';
import ProjectFlow from '../../components/UPProjectFlow/ProjectFlow';

function ProjectDetail({ ...props }) {
  const { project, provider, accounts, ethereum, setWalletAccount, user, swapTokenModalRequest } =
    props;
  const item = props.project;

  const [stake, setStake] = useState(false);

  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState();

  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState();

  const tokenAddress = '0xa4f07529ce9119ab60d4da69fb8cc28ea6bc6f25';
  const tokenSymbol = 'DUNOT';
  const tokenDecimals = 4;
  const stakeSetup = () => {
    setStake(true);
  };
  const handleShow = () => {
    swapTokenModalRequest(true);
  };
  const connectWallet = async () => {
    wallet.connectWallet();
  };

  const addUnoTokenFunction = async () => {
    try {
      const provider = await detectEthereumProvider();
      const wasAdded = await provider.sendAsync({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
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
  console.log('item', item);
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
        <h1>Page is Loading.....</h1>
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
                        src={process.env.REACT_APP_API_URL + '/projects/' + item.id + '/image'}
                        height={92} width={92}
                      />
                    </div>
                  </Row>
                  
                  <Row className="col-md-12 col-lg-12 mx-0">
                    <Card.Title className="text-fs-head-lg"> Metamask</Card.Title>
                    <Card.Text className="text-fs-body-sm">Lorem Ipsum Dolor</Card.Text>
                  </Row>
                </div>
                <div className="project-detail-price-div">
                  <Card.Text className="text-fs-body-sm mb-0">PRICE</Card.Text>
                  <Card.Title className="text-fs-head-md 
                  mb-0">${item.token_price_in_usd}</Card.Title>
                  <Card.Text className="text-fs-body-md">{item.token_price_in_uno} UNO</Card.Text>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="project-detail-name-div">
                  <Card.Text className="text-fs-body-md">Round</Card.Text>
                  <Card.Title className="text-fs-head-md">Sale Ended</Card.Title>
                </div>

                <div className="project-detail-price-div">
                  <Card.Text className="text-fs-body-md">Time Left</Card.Text>
                  <Card.Title className="text-fs-head-md">Sale Ended</Card.Title>
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
                  label={'Sale: 92.45%  Burned: 5.32%'}
                />
              </div>
              <Card.Body className="project-detail-card-body">
                <div className="project-detail-name-div">
                  <Card.Text>TOKEN DISTRIBUTION</Card.Text>
                  <Card.Title className='text-fs-head-md'>
                    {/* {item.token_distribution} */}
                    Sale Ended
                    </Card.Title>
                </div>

                <div className="project-detail-price-div">
                  <Card.Text>TOTAL RAISED</Card.Text>
                  <Card.Title>$0/${item.token_total_raise}</Card.Title>
                </div>

                <span>{error ? error.message : null}</span>
              </Card.Body>
              <Card.Footer className="bg-white">
                <div className="project-detail-footer-left-div">
                  <Card.Title>Want to automate the sale?</Card.Title>
                </div>
                <div className="project-detail-footer-right-div">
                  <Button variant="primary" onClick={addUnoTokenFunction} className="mx-2">
                    Add DUNOT{' '}
                  </Button>
                  {checkAllConditionForStake(user, accounts) ? (
                    <Button
                      variant="primary"
                      onClick={() => {
                        stakeSetup();
                        handleShow();
                      }}
                    >
                      View My Automations
                    </Button>
                  ) : (
                    <Button variant="primary" disabled={true}>
                      View My Automations
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
                <UPSwapTokenModal />
              ) : (
                <div></div>
              )}
            </div>
          )}
           <ProjectFlow/>
          <UPProjectInfo {...props} />
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
    swapTokenModalRequest: (payload) => {
      dispatch(swapTokenModalAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
