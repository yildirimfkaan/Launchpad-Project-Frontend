import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import UPIcons from '../UPIcons/UPIcons';
import './UPQuickHandler.scss';

function UPQuickHandler({ ...props }) {
  const { user, accounts, isSignUpAndKYC, isVerifyWallet, isStakeUnoToken, href, history } = props;

  return (
    <>
      <Row className="py-4">
        {isSignUpAndKYC && (
          <Col className="mt-2" lg="3" md="6" sm="12">
            <div className="border rounded p-2">
              <div className="d-flex align-items-center border-bottom-0">
                <UPIcons
                  name={user ? 'MdDone' : 'MdPriorityHigh'}
                  color={user ? '#28a745' : '#ffc107'}
                  size="24"
                />
                <span className="h6 mb-0 mx-auto">SIGN UP AND KYC</span>
              </div>
              <div className="quick-handler-body py-3 px-1 text-muted">
                In order to participate in sales on Unopad, you must sign up and KYC first. You can
                still stake and earn UNOTOKEN without registering.
              </div>
              <div className="d-flex justify-content-center border-top-0">
                <Button
                  variant={user ? 'outline-success' : 'outline-warning'}
                  disabled={user}
                  onClick={() => {
                    if (!user) {
                      history.push('/login');
                    }
                  }}
                >
                  {!user ? 'Start the KYC Process' : 'Done'}
                </Button>
              </div>
            </div>
          </Col>
        )}
        {isVerifyWallet && (
          <Col className="mt-2" lg="3" md="6" sm="12">
            <div className="border rounded p-2">
              <div className="d-flex align-items-center border-bottom-0">
                <UPIcons
                  name={user ? 'MdDone' : 'MdPriorityHigh'}
                  color={user ? '#28a745' : '#ffc107'}
                  size="24"
                />
                <span className="h6 mb-0 mx-auto">VERIFY WALLET</span>
              </div>
              <div className="quick-handler-body py-3 px-1 text-muted">
                Once you have registered and submitted your KYC, you must verify your wallet. This
                is the only wallet you will be able to use for sales.
              </div>
              <div className="d-flex justify-content-center border-top-0">
                <Button
                  variant={user ? 'outline-success' : 'outline-warning'}
                  disabled={user}
                  onClick={() => {
                    if (!user) {
                      history.push('/login');
                    }
                  }}
                >
                  {!user ? 'Verify Wallet' : 'Done'}
                </Button>
              </div>
            </div>
          </Col>
        )}
        {isStakeUnoToken && (
          <Col className="mt-2" lg="3" md="6" sm="12">
            <div className="border rounded p-2">
              <div className="d-flex align-items-center border-bottom-0">
                <UPIcons name="MdDone" color="#28a745" size="24" />
                <span className="h6 mb-0 mx-auto">STAKE UNOTOKEN</span>
              </div>
              <div className="quick-handler-body py-3 px-1 text-muted">
                By staking UNOTOKEN, you earn allocation in IDOs. If you do not want to participate
                in sales, you can still benefit from staking.
              </div>
              <div className="d-flex justify-content-center border-top-0">
                <Button variant="outline-success">Start Staking</Button>
              </div>
            </div>
          </Col>
        )}
        <Col className="mt-2" lg="3" md="6" sm="12">
          <div className="border rounded p-2">
            <div className="d-flex align-items-center border-bottom-0">
              <UPIcons name="MdDone" color="#28a745" size="24" />
              <span className="h6 mb-0 mx-auto">REGISTER FOR SALE</span>
            </div>
            <div className="quick-handler-body py-3 px-1 text-muted">
              During the registration period, you must confirm your interest in participation. Once
              registration closes, you will not be able to register until the next sale.
            </div>
            <div className="d-flex justify-content-center border-top-0">
              <Button variant="outline-success" onClick={() => (window.location.href = href)}>
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
