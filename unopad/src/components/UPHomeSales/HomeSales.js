import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './HomeSales.scss';
import { Container, Table } from 'react-bootstrap';
import UPQuickHandler from '../UPQuickHandler/UPQuickHandler';
import { quickHandlerImages } from '../../helpers/quickHandlerImages';

function HomeSales(...props) {
  return (
    <div>
      <Row>
        <Col className="main-title">
          <div className="text-fs-head-lg title">SALES</div>
          <div className="text-fs-head-xs text">
            Leverage on any tokens with a protocol trusted with billions for its performance and
            reliability.
          </div>
        </Col>
      </Row>
      <div className="back-model">
        <Container className="home-sales-container d-flex flex-column justify-content-end">
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

          <Row className="px-5">
            <Col>
              <Table className="table-sales text-white" responsive borderless>
                <thead className="table-head text-fs-head-xs">
                  <tr>
                    <th>Project Name</th>
                    <th>IDO Token Price</th>
                    <th>Current Price</th>
                    <th>No Registrations</th>
                    <th>Total Tokens Sold</th>
                    <th>Token Sale En</th>
                  </tr>
                </thead>
                <tbody className="text-t-body-color text-fs-head-xs">
                  <tr>
                    <td>UNOTOKEN</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>UNOS</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>UNOX</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HomeSales;
