import { Table, NavLink, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './UPProjectCard.scss';
import UPIcons from '../UPIcons/UPIcons';
import { mainColors } from '../../helpers/colors';
import metamaskIcon from '../UPWalletAccountDetailModal/metamask-icon.png';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function Card1(props) {
  const { projects } = props;
  return (
    <Row className="d-flex justify-content-around mt-2">
      {Object.entries(projects).map((item, index) => (
        <Col className="d-flex flex-column" lg={4} sm={12} md={6}>
          <NavLink as={Link} to={'/project/' + item[1].id}>
            <div className="project-img-div ">
              <div className="d-flex pt-5 text-ultra-light align-items-center ">
                <div className="ps-3 pe-2 pt-4">
                  <img alt="metamask-icon" src={metamaskIcon} className="project-icon" />
                </div>
                <div className="ps-3 pe-3 pt-4">
                  <div className="text-fs-project-name">{item[1].project_name}</div>
                  <div className="text-fs-head-sm">1 asd = 0.003 UNO</div>
                </div>
              </div>
            </div>
            <div className="d-flex text-fs-body-md ps-2 pt-3">
              Total Raised:<div className="text-primary text-fs-head-md ps-2"> $100.00 </div>
            </div>
            <div>
              <ProgressBar
                className="project-progress-bar mt-3 mb-3"
                style={{ height: '30px' }}
                now={85}
                label={'Sale: 92.45%  Burned: 5.32%'}
              />
            </div>
            <Table>
              <tbody>
                <tr>
                  <td className="text-fs-body-md">Register</td>
                  <td className="text-fs-body-lg text-end">5600</td>
                </tr>
                <tr>
                  <td className="text-fs-body-md ">Token Sale</td>
                  <td className="text-fs-body-lg text-end">$0.140</td>
                </tr>
                <tr>
                  <td className="text-fs-body-md">Start Date</td>
                  <td className="text-fs-body-lg text-end">01.08.2022</td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <tbody className="text-fs-tag">
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <UPIcons
                        name="BiCoin"
                        color={mainColors['primary']}
                        size="25"
                        className="me-2"
                      />
                      <div className="d-flex flex-column align-items-start">
                        <div>
                          Token Sold: <span>85.71M</span>
                        </div>
                        <div>
                          Total Tokens:<span>85.71M</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="d-flex d-flex align-items-center justify-content-end">
                      <UPIcons
                        name="BiTimeFive"
                        color={mainColors['primary']}
                        size="25"
                        className="me-2"
                      />
                      <div className="d-flex flex-column align-items-start justify-content-end">
                        Sale Ended
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </NavLink>
        </Col>
      ))}
    </Row>
  );
}
