/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';

import {
  accountDetailsRequestAction,
  resendVerificationEmailRequestAction,
} from '../../store/account/userActions';
import wallet from '../../helpers/wallet';
import { checkUserVerified, checkUserWalletAccount } from '../../helpers/verificationHelper';
import './Profile.scss';
import walletLogo from '../../../src/assets/img/svg-icons/wallet-active.svg';
function Profile({ ...props }) {
  const { user, accountDetailsRequest, accounts, resendVerificationEmailRequest } = props;

  const [activeTab, setActiveTab] = useState(props.location.pathname.substring(1));

  useEffect(() => {
    accountDetailsRequest();
  }, []);

  useEffect(() => {
    if (
      props.location.hash.substring(1) === 'verify' ||
      props.location.hash.substring(1) === 'kyc' ||
      props.location.hash.substring(1) === 'profile'
    ) {
      setActiveTab(props.location.hash.substring(1));
    }
  }, [props.location]);

  function verifyEmail() {
    resendVerificationEmailRequest();
  }

  const handleSelect = (e) => {
    //set state
    setActiveTab(e);

    props.history.replace({
      hash: `${e}`,
    });
  };

  return (
    <>
      <Container className="justify-content-center align-items-center col-lg-6 col-sm-6">
        <Tabs
          defaultActiveKey="profile"
          activeKey={activeTab ? activeTab : 'profile'}
          className="text-fs-head-xs"
          justify
          onSelect={(e) => handleSelect(e)}
        >
          <Tab eventKey="profile" title="Profile">
            {activeTab === 'profile' ? (
              <Col className="mt-5 mb-5">
                <Row className="d-flex justify-content-center align-items-center">
                  <b className="d-flex justify-content-center text-fs-head-xs">Name/Surname</b>{' '}
                  
                   <Form.Group className="col-8 mt-3"> <Form.Control
                      value={user.full_name}
                      type="text"
                      className="text-fs-body-md text-t-body-color bg-light" disabled
                    />
                    </Form.Group>
                  
                </Row>
                <Row className="d-flex justify-content-center align-items-center">
                  <b className="d-flex justify-content-center text-fs-head-xs mt-2">Email</b>{' '}
                  <Form.Group className="col-8 mt-3"> <Form.Control
                      value={user.email}
                      type="text"
                      className="text-fs-body-md text-t-body-color bg-light" disabled
                    />
                    </Form.Group>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3 md-2">
                  {checkUserVerified(user) ? (
                    <Button disabled={true} variant="success" className="col-4">
                      Email Verified
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={verifyEmail} className="col-4">
                      Verify Email
                    </Button>
                  )}
                </Row>
              </Col>
            ) : (
              <div></div>
            )}
          </Tab>
          <Tab eventKey="kyc" title="KYC Status" >
            {activeTab === 'kyc' ? (
              <Col className="mt-5 mb-5">
                <Row className="d-flex justify-content-center align-items-center text-fs-head-xs">
                  INDIVIDUAL KYC VERIFICATION
                </Row>
                <Row className="d-flex justify-content-center align-items-center text-center text-fs-body-md mt-3">
                  Leverage on any tokens with a protocol trusted with billions for its performance
                  and reliability.
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-4">
                  <Button variant="primary" className="col-4">
                    Start
                  </Button>
                </Row>
              </Col>
            ) : (
              <div></div>
            )}
          </Tab>
          <Tab eventKey="verify" title="Verify Wallet">
            {activeTab === 'verify' ? (
              <Col className="d-flex justify-content-center align-items-center mt-5 mb-5">
                <Row>
                  {checkUserWalletAccount(accounts) ? (
                    <Col className="justify-content-center align-items-center">
                      <Row className="d-flex justify-content-center align-items-center ">
                        <div className="d-flex justify-content-center align-items-center">
                          <img
                            src={walletLogo}
                            alt="Logo"
                            heigth={80}
                            width={80}
                            className="d-flex  justify-content-center"
                          />
                        </div>
                      </Row>

                      <Row className="d-flex justify-content-center align-items-center mt-3">
                        <div className="col-8 text-fs-head-xs text-center">Wallet is Verified!</div>
                      </Row>
                      <Row className="d-flex justify-content-center align-items-center mt-3">
                        <div className="d-flex text-fs-body-md text-center">
                          {' '}
                          Your verified wallet adress is &nbsp;
                          <div className="text-fs-body-md text-primary">
                            {accounts?.[0].slice(0, 6)}...{accounts?.[0].slice(36, 42)}
                          </div>
                        </div>
                      </Row>
                    </Col>
                  ) : (
                    <Col className="mt-2">
                      <Row className="d-flex justify-content-center align-items-center text-fs-head-xs">
                        Verify Wallet
                      </Row>
                      <Row className="d-flex justify-content-center align-items-center text-fs-body-md text-center mt-2">
                        Leverage on any tokens with a protocol trusted with billions for its
                        performance and reliability.
                      </Row>
                      <Row className="d-flex justify-content-center align-items-center mt-3">
                        <Button
                          className="me-2 col-6"
                          variant="primary"
                          onClick={() => wallet.connectWallet()}
                        >
                          Connect
                        </Button>
                      </Row>
                    </Col>
                  )}
                </Row>
              </Col>
            ) : (
              <div></div>
            )}
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    accountVerifiedData: state.userReducer.accountVerifiedData,
    user: state.userReducer.user,
    accounts: state.walletReducer.accounts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountDetailsRequest: (payload) => {
      dispatch(accountDetailsRequestAction(payload));
    },
    resendVerificationEmailRequest: (payload) => {
      dispatch(resendVerificationEmailRequestAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
