import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Col, Container } from 'react-bootstrap';

import { verifyEmailRequestAction } from '../store/account/userActions';
import wallet from '../helpers/wallet';

function Profile({ ...props }) {
  const {
    user,
    verifyEmailRequest,
    accountVerifiedData,
    accounts,
    stakeNowActive,
  } = props;

  async function verifyEmail() {
    console.log('worked');
    await verifyEmailRequest();
  }
  console.log(user);
  console.log("stake now active", stakeNowActive)

  // useEffect(()=> {

  //   console.log("useEffect acc verified",accountVerifiedData);
  //   const data = window.localStorage.getItem('EMAIL_VERIFICATION_DATA')
  //   verifyEmailRequest(JSON.parse(data))
  // },[])

  // useEffect(()=> {

  //   console.log("useEffect acc verified",accountVerifiedData,"WALLET ACC", accounts?.[0]);
  //   window.localStorage.setItem('EMAIL_VERIFICATION_DATA',JSON.stringify(accountVerifiedData))
  //   window.localStorage.setItem('WALLET_VERIFICATION_DATA',JSON.stringify(accounts?.[0]))
  // },[accountVerifiedData,accounts?.[0]])

  return (
    <>
      <Container>
        <Card>
          <Card.Header as="h5">Featured</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Col>
              <Button variant="primary">Profile Details</Button>
              {accounts?.[0] ? (
                <Button disabled={true} variant="success">
                  Wallet Connected
                </Button>
              ) : (
                <Button variant="primary" onClick={() => wallet.connectWallet()}>
                  Connect Wallet
                </Button>
              )}
              <Button variant="primary">KYC Check</Button>
              {accountVerifiedData ? (
                <Button disabled={true} variant="success">
                  Email Verified
                </Button>
              ) : (
                <Button variant="primary" onClick={verifyEmail}>
                  Verify Email
                </Button>
              )}
            </Col>
            <Col>
              <Card.Text>Name , Surname</Card.Text>
              <Card.Text>Wallet Address:{accounts?.[0]}</Card.Text>

              <Card.Text>Email : {user.username}</Card.Text>
              {accountVerifiedData ? (
                <Card.Text>VERIFIED</Card.Text>
              ) : (
                <Card.Text>NON-VERIFIED USER</Card.Text>
              )}
              {accounts?.[0] ? (
                <Card.Text>WALLET VERIFIED</Card.Text>
              ) : (
                <Card.Text>NON-VERIFIED WALLET</Card.Text>
              )}
            </Col>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    accountVerifiedData: state.userReducer.accountVerifiedData,
    user: state.userReducer.user,
    accounts: state.walletReducer.accounts,
    stakeNowActive: state.walletReducer.stakeNowActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    verifyEmailRequest: (payload) => {
      dispatch(verifyEmailRequestAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
