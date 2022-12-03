import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import './UPQuickHandler.scss';
import { checkUserWalletAccount } from '../../helpers/verificationHelper';
import wallet from '../../helpers/wallet';

function UPQuickHandler({ ...props }) {
  const {
    user,
    accounts,
    isSignUpAndKYC,
    signUpAndKYCImg,
    isVerifyWallet,
    verifyWalletImg,
    isStakeUnoToken,
    stakeUnoTokenImg,
    registerForSaleImg,
    history,
    className,
  } = props;

  const [signUpAndKycRef, setSignUpAndKycRef] = useState(null);
  const [verifyWalletRef, setVerifyWalletRef] = useState(null);
  const [stakeUnoTokenRef, setStakeUnoTokenRef] = useState(null);
  const [registerForSaleRef, setRegisterForSaleRef] = useState(null);

  const [size, setSize] = useState([0, 0]);

  function updateSize() {
    setSize([window.innerWidth, window.innerHeight]);
  }

  useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  function getImgStyle(ref, img) {
    const halfHeight = Math.floor(img?.height / 2);
    return {
      position: 'absolute',
      top: ref?.offsetTop - halfHeight,
    };
  }

  return (
    <>
      <Row className={className}>
        {isSignUpAndKYC && (
          <Col
            id="sign-up-and-kyc-col"
            ref={(newRef) => setSignUpAndKycRef(newRef)}
            className="quick-handler-col"
            lg={isStakeUnoToken ? '3' : '4'}
            md="6"
            sm="12"
          >
            <div className="d-flex justify-content-center align-items-start">
              <img
                alt="sign-up-and-kyc"
                src={signUpAndKYCImg.src}
                style={getImgStyle(signUpAndKycRef, signUpAndKYCImg)}
              />
            </div>

            <div
              className="bg-white rounded pb-5 px-4 mx-1 shadow 
              quick-handler-container d-flex flex-column justify-content-end"
            >
              <div className="h6 mb-0 text-center text-primary text-fs-head-xs">
                SIGN UP AND KYC
              </div>
              <div
                className="py-3 text-t-body-color text-center text-fs-body-md 
              quick-handler-body"
              >
                In order to participate in sales on Unopad, you must sign up and KYC first. You can
                still stake and earn UNOTOKEN without registering.
              </div>
              <div className="d-flex justify-content-center border-top-0">
                <Button
                  className="text-fs-head-sm py-2"
                  variant="primary"
                  disabled={user}
                  onClick={() => {
                    if (!user) {
                      history.push('/signup');
                    }
                  }}
                >
                  {user ? 'Signed' : 'Sign Up'}
                </Button>
              </div>
            </div>
          </Col>
        )}
        {isVerifyWallet && (
          <Col
            id="verify-wallet-col"
            ref={(newRef) => setVerifyWalletRef(newRef)}
            className="quick-handler-col"
            lg={isStakeUnoToken ? '3' : '4'}
            md="6"
            sm="12"
          >
            <div className="d-flex justify-content-center align-items-start">
              <img
                alt="sign-up-and-kyc"
                src={verifyWalletImg.src}
                style={getImgStyle(verifyWalletRef, verifyWalletImg)}
              />
            </div>

            <div
              className="bg-white rounded pb-5 px-4 mx-1 shadow 
              quick-handler-container d-flex flex-column justify-content-end"
            >
              <div className="h6 mb-0 text-center text-primary text-fs-head-xs">VERIFY WALLET</div>
              <div
                className="py-3 text-t-body-color text-center text-fs-body-md 
              quick-handler-body"
              >
                Once you have registered and submitted your KYC, you must verify your wallet. This
                is the only wallet you will be able to use for sales.
              </div>
              <div className="d-flex justify-content-center border-top-0">
                <Button
                  className="text-fs-head-sm py-2"
                  variant="primary"
                  disabled={checkUserWalletAccount(accounts)}
                  onClick={() => {
                    if (!checkUserWalletAccount(accounts)) {
                      wallet.connectWallet();
                    }
                  }}
                >
                  {checkUserWalletAccount(accounts) ? 'Verified' : 'Verify'}
                </Button>
              </div>
            </div>
          </Col>
        )}
        {isStakeUnoToken && (
          <Col
            id="stake-uno-token-col"
            ref={(newRef) => setStakeUnoTokenRef(newRef)}
            className="quick-handler-col"
            lg={isStakeUnoToken ? '3' : '4'}
            md="6"
            sm="12"
          >
            <div className="d-flex justify-content-center align-items-start">
              <img
                alt="sign-up-and-kyc"
                src={stakeUnoTokenImg.src}
                style={getImgStyle(stakeUnoTokenRef, stakeUnoTokenImg)}
              />
            </div>

            <div
              className="bg-white rounded pb-5 px-4 mx-1 shadow 
              quick-handler-container d-flex flex-column justify-content-end"
            >
              <div className="h6 mb-0 text-center text-primary text-fs-head-xs">STAKE UNOTOKEN</div>
              <div
                className="py-3 text-t-body-color text-center text-fs-body-md 
              quick-handler-body"
              >
                By staking UNOTOKEN, you earn allocation in IDOs. If you do not want to participate
                in sales, you can still benefit from staking.
              </div>
              <div className="d-flex justify-content-center border-top-0">
                <Button
                  className="text-fs-head-sm py-2"
                  variant="primary"
                  disabled={user}
                  onClick={() => {
                    if (!user) {
                      //history.push('/login');
                    }
                  }}
                >
                  Active Sales
                </Button>
              </div>
            </div>
          </Col>
        )}
        <Col
          id="register-for-sale-col"
          ref={(newRef) => setRegisterForSaleRef(newRef)}
          className="quick-handler-col"
          lg={isStakeUnoToken ? '3' : '4'}
          md="6"
          sm="12"
        >
          <div className="d-flex justify-content-center align-items-start">
            <img
              alt="sign-up-and-kyc"
              src={registerForSaleImg.src}
              style={getImgStyle(registerForSaleRef, registerForSaleImg)}
            />
          </div>

          <div
            className="bg-white rounded pb-5 px-4 mx-1 shadow  
            quick-handler-container d-flex flex-column justify-content-end"
          >
            <div className="h6 mb-0 text-center text-primary text-fs-head-xs">
              REGISTER FOR SALE
            </div>
            <div className="py-3 text-t-body-color text-center text-fs-body-md quick-handler-body">
              During the registration period, you must confirm your interest in participation. Once
              registration closes, you will not be able to register until the next sale.
            </div>
            <div className="d-flex justify-content-center border-top-0">
              <Button
                className="text-fs-head-sm py-2"
                variant="primary"
                onClick={() => {
                  history.push('/sales');
                }}
              >
                Active Sales
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    accounts: state.walletReducer.accounts,
  };
}

export default connect(mapStateToProps)(UPQuickHandler);
