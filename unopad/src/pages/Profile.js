import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Container } from 'react-bootstrap';

import {
  accountDetailsRequestAction,
  resendVerificationEmailRequestAction,
} from '../store/account/userActions';
import wallet from '../helpers/wallet';
import { checkUserVerified, checkUserWalletAccount } from '../helpers/verificationHelper';

function Profile({ ...props }) {
  const { user, accountDetailsRequest, accounts, resendVerificationEmailRequest } = props;

  useEffect(() => {
    accountDetailsRequest();
  }, []);

  function verifyEmail() {
    resendVerificationEmailRequest();
  }

  return (
    <>
      <Container>
        <div className="py-5">
          <span className="h5">Profile</span>
          <div className="border rounded p-2">
            <div>
              {checkUserWalletAccount(accounts) ? (
                <Button className="mr-2" disabled={true} variant="success">
                  Wallet Connected
                </Button>
              ) : (
                <Button className="mr-2" variant="primary" onClick={() => wallet.connectWallet()}>
                  Connect Wallet
                </Button>
              )}
              <Button className="mr-2" variant="primary">
                KYC Check
              </Button>
              {checkUserVerified(user) ? (
                <Button disabled={true} variant="success">
                  Email Verified
                </Button>
              ) : (
                <Button variant="primary" onClick={verifyEmail}>
                  Verify Email
                </Button>
              )}
            </div>

            <div>
              <span>
                <b>Name/Surname:</b> {user.full_name}
              </span>
              <div className="d-flex mb-2 mt-2">
                <span className="mr-2">
                  <b>Email:</b> {user.email}
                </span>
                {checkUserVerified(user) ? (
                  <Badge bg="success">Verified</Badge>
                ) : (
                  <Badge bg="warning">Not verified</Badge>
                )}
              </div>
              <div className="d-flex">
                <span className="mr-2">
                  <b>Wallet Address: </b> {accounts?.[0]}
                </span>
                {checkUserWalletAccount(accounts) ? (
                  <Badge bg="success">Verified</Badge>
                ) : (
                  <Badge bg="warning">Not verified</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
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
