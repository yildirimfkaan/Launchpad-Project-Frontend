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
import UPRoadmap from '../../components/UPRoadmap';
import UPIcons from '../../components/UPIcons/UPIcons';
import { swapTokenModalAction } from '../../store/project/projectActions';
import UPSwapTokenModal from '../../components/UPSwapTokenModal/UPSwapTokenModal';

function ProjectDetail({ ...props }) {
  const {
    project,
    provider,
    accounts,
    ethereum,
    setWalletAccount,
    user,
    swapTokenModalRequest,
  } = props;
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
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Button variant="primary" onClick={addUnoTokenFunction}>
                Add DUNOT{' '}
              </Button>
            </Col>
            <Col>
              <Card className="project-detail-card mx-auto">
                <Card.Img
                  variant="top"
                  src={process.env.REACT_APP_API_URL + '/projects/' + item.id + '/image'}
                />
                <Card.Body>
                  <Card.Title>{item.project_name}</Card.Title>
                  <Card.Text>{item.project_sale_type}</Card.Text>
                  <Card.Text>{item.project_explanation_text}</Card.Text>

                  <Col className="App">
                    <ProgressBar now={item.project_percent_raised} />
                  </Col>
                  <div>
                    {checkAllConditionForStake(user, accounts) ? (
                      <Button
                        variant="primary"
                        onClick={() => {
                          stakeSetup();
                          handleShow();
                        }}
                      >
                        Buy Now !
                      </Button>
                    ) : (
                      <Button variant="primary" disabled={true}>
                        Buy Now !
                      </Button>
                    )}
                  </div>
                  <span>{error ? error.message : null}</span>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {checkAllConditionForStake(user, accounts) && (
            <div>
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
          <UPRoadmap />
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
