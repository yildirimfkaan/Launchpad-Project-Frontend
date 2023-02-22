import React, { useState } from 'react';
import { getProjectByID, getUnopadProjectRequestAction } from '../../store/project/projectActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setWalletAccountData } from '../../store/wallet/walletActions';
import { Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';

import wallet from '../../helpers/wallet';
import detectEthereumProvider from '@metamask/detect-provider';
import './ProjectDetail.scss';
// import UPProjectInfo from '../../components/UPProjectInfo/UPProjectInfo';
// import UPIcons from '../../components/UPIcons/UPIcons';
import { swapTokenModalAction } from '../../store/project/projectActions';
import { buyTokenModalAction } from '../../store/token/tokenActions';
// import UPBuyTokenModal from '../../components/UPBuyTokenModal/UPBuyTokenModal';
// import UPSwapTokenModal from '../../components/UPSwapTokenModal/UPSwapTokenModal';

import SpinnerUnopad from '../../components/UPSpinnerUnopad/UPSpinnerUnopad';
import Subscribe from '../../components/UPSubscribe/Subscribe';

function StakingDetail({ ...props }) {
  const {
    project,
    unopadProject,
    provider,
    accounts,
    ethereum,
    setWalletAccount,
    user,
    buyTokenModalRequest,
    swapTokenModalRequest,
    getUnopadProjectRequest,
  } = props;

  const item = props.project;

  const [stake, setStake] = useState(false);
  const [swap, setSwap] = useState(false);

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
  const swapSetup = () => {
    setSwap(true);
  };
  const handleShow = () => {
    buyTokenModalRequest(true);
  };
  const handleShowSwap = () => {
    swapTokenModalRequest(true);
  };
  const connectWallet = async () => {
    wallet.connectWallet();
  };
  console.log(project)
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
    console.log('a');
    const payload = {
      id: props.match.params.id,
    };
    props.getProjectByID(payload);
    getUnopadProjectRequest();

    return () => {};
  }, []);

  return (
    <>
      {!project || !unopadProject ? (
        <SpinnerUnopad />
      ) : (
        <Container className="mt-5 px-5">
          <Row>
            <Col>
              <Row>
                <Col className='d-flex'>
                  <Card style={{ width: '15rem' }}>
                    <Card.Body>
                      <Card.Text>Total UNOT Staked</Card.Text>
                      <Card.Title>7182487123</Card.Title>
                    </Card.Body>
                  </Card>
                  <Card style={{ width: '15rem' }}>
                    <Card.Body>
                      <Card.Text>Total Activity Count</Card.Text>
                      <Card.Title>56</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                
              </Row>
              <Row>
                <Col className='d-flex'>
                  {' '}
                  <Card style={{ width: '15rem' }}>
                    <Card.Body>
                      <Card.Text>My UNOT Staked</Card.Text>
                      <Card.Title>234243521</Card.Title>
                    </Card.Body>
                  </Card>
                  <Card style={{ width: '15rem' }}>
                    <Card.Body>
                      <Card.Text>My Activity Count</Card.Text>
                      <Card.Title>23</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col>
              <Card className="project-detail-card col-md-12 col-sm-12">
                <Card.Header className="bg-white">
                  <Row>
                    {' '}
                    <div
                      className="project-detail-name-div d-flex justify-content-between 
              align-items-center col-md-6 col-sm-4 bg-red"
                    >
                      {' '}
                      <Row className="col-md-12 col-lg-12 mx-0">
                        <div className="fw-bold text-primary">Stake {item.token.symbol}</div>
                        <div className="text-fs-body-sm">Balance</div>
                        <div className="text-fs-head-md">0 {item.token.symbol} (~0$)</div>
                      </Row>
                    </div>
                    <div
                      className="project-detail-name-div d-flex justify-content-between 
              align-items-center col-md-6 col-sm-4 bg-yellow"
                    >
                      {' '}
                      <Row className="col-md-12 col-lg-12 mx-0">
                        <Col className="d-flex">
                          <Row>
                            <Form.Control type="text" placeholder={item.token.symbol} />
                          </Row>
                          <Row style={{ width: '50%' }}>
                            {' '}
                            <Button variant="primary">Stake {item.token.symbol}</Button>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Row>
                  <Row className='mt-3'>
                    <div
                      className="project-detail-name-div d-flex justify-content-between 
              align-items-center col-md-6 col-sm-4 bg-red"
                    >
                      {' '}
                      <Row className="col-md-12 col-lg-12 mx-0">
                        <div className="fw-bold text-primary">Withdraw {item.token.symbol}</div>
                        <div className="text-fs-body-sm">Balance</div>
                        <div className="text-fs-head-md">0 {item.token.symbol} (~0$)</div>
                      </Row>
                    </div>
                    <div
                      className="project-detail-name-div d-flex justify-content-between 
              align-items-center col-md-6 col-sm-4 bg-yellow"
                    >
                      {' '}
                      <Row className="col-md-12 col-lg-12 mx-0">
                        <Col className="d-flex">
                          <Row>
                            <Form.Control type="text" placeholder={item.token.symbol} />
                          </Row>
                          <Row style={{ width: '50%' }}>
                            {' '}
                            <Button variant="primary">Withdraw {item.token.symbol}</Button>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Row>
                </Card.Header>

                <Card.Body className="project-detail-card-body bg-unopad-ultra-light">
                  <h4 className="text-primary">Your Stats</h4>
                  <ListGroup variant="flush" className="bg-primary">
                    <ListGroup.Item>
                      <Row>
                        <Col>Current APY</Col>
                        <Col className="text-end fw-bold">8.06 %</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex">
                      <Col>My Staked UNOT</Col>
                      <Col className="text-end fw-bold">0</Col>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex">
                      <Col>My Earned UNOT</Col>
                      <Col className="text-end fw-bold">0</Col>
                    </ListGroup.Item>
                  </ListGroup>

                  <div className="project-detail-name-div"></div>

                  <div className="project-detail-price-div"></div>

                  <span>{error ? error.message : null}</span>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <div className="project-detail-footer-left-div">
                    <Card.Title>Do you want to lock your staked {item.token.symbol} ?</Card.Title>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <h4>UNOT Tokens Staked Over Time</h4>
            <div className="mt-3 d-flex">
              {' '}
              <Col>
                {' '}
                <Card style={{ width: '15rem' }}>
                  <Card.Body>
                    <Card.Title>Total UNOT Staked</Card.Title>
                    <Card.Title className="text-primary">1.374.004,42</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                {' '}
                <Card style={{ width: '15rem' }}>
                  <Card.Body>
                    <Card.Title>Total Rewards Redistributed</Card.Title>
                    <Card.Title className="text-primary">1.374.004,42</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                {' '}
                <Card style={{ width: '15rem' }}>
                  <Card.Body>
                    <Card.Title>Reward Unlock Rate</Card.Title>
                    <Card.Title className="text-primary">0.17 UNOT/MIN</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          </Row>

          {/* {checkAllConditionForStake(user, accounts) && (
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
              {checkAllConditionForStake(user, accounts) && swap ? (
                <UPSwapTokenModal />
              ) : (
                <div></div>
              )}
            </div>
          )} */}

          {/* <UPProjectInfo {...props} /> */}
          <Subscribe />
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
    unopadProject: state.projectReducer.unopadProject,
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
    swapTokenModalRequest: (payload) => {
      dispatch(swapTokenModalAction(payload));
    },
    getUnopadProjectRequest: (payload) => {
      dispatch(getUnopadProjectRequestAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StakingDetail);
