import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './HomeSales.scss';
import { Container } from 'react-bootstrap';
import UPQuickHandler from '../UPQuickHandler/UPQuickHandler';
import { quickHandlerImages } from '../../helpers/quickHandlerImages';

function HomeSales({...props}) {
  return (
    <>
      <Container>
      <Row>
        <Col className="main-title">
          <div className="text-fs-head-lg title">SALES</div>
          <div className="text-fs-head-xs text">
            Leverage on any tokens with a protocol trusted with billions for its performance and
            reliability.
          </div>
        </Col>
      </Row>
      </Container>
      <div className="back-model">
        <Container className="home-sales-container d-flex flex-column justify-content-center">
          <UPQuickHandler
            className="justify-content-center px-5"
            isSignUpAndKYC={true}
            signUpAndKYCImg={quickHandlerImages.salesSignUpAndKYCImg}
            isVerifyWallet={true}
            verifyWalletImg={quickHandlerImages.salesVerifyWalletImg}
            isStakingUnoToken={false}
            registerForSaleImg={quickHandlerImages.salesRegisterForSale}
            href="#sales-table"
            history={props.history}
          />

        </Container>
      </div>
    </>
  );
}

export default HomeSales;
