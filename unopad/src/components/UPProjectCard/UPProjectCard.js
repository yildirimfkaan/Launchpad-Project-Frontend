import { Table, NavLink, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './UPProjectCard.scss';
import UPIcons from '../UPIcons/UPIcons';
import { mainColors } from '../../helpers/colors';
// import metamaskIcon from '../UPWalletAccountDetailModal/metamask-icon.png';
// import ProgressBar from 'react-bootstrap/ProgressBar';
import unopadMiniIcon from '../../assets/img/logo/unopad-logo-mini.png';
// import unopadCardDefaultBackground from '../../assets/img/background/card-title-background.png';
import unopadCardDefaultLogo from '../../assets/img/logo/unopad-logo-white.png';
import { useEffect, useState } from 'react';

const CARD_PROGRESS_BAR_VALUE_WIDTH = 37;

export default function Card1(props) {
  const { projects, item ,redirectBaseUrl} = props;

  const [projectCardRef, setProjectCardRef] = useState(null);

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

  const logoOnErrorHandler = (event) => {
    event.currentTarget.src = unopadCardDefaultLogo;
    event.currentTarget.className = 'project-icon';
  };

  function getProgressBarValueStyle() {
    const projectCardLeft = projectCardRef?.offsetLeft;
    const projectCardWidth = projectCardRef?.offsetWidth;

    return { left: projectCardLeft + projectCardWidth / 2 - CARD_PROGRESS_BAR_VALUE_WIDTH / 2 };
  }
  console.log(redirectBaseUrl)
  return (
    <Col
      ref={(newRef) => setProjectCardRef(newRef)}
      className="d-flex flex-column pb-4"
      lg={4}
      sm={12}
      md={6}
    >
      <NavLink as={Link} to={redirectBaseUrl +'/' + item[1].id} className="shadow">
        <div
          className="project-img-div pt-5"
          style={{
            background: `linear-gradient(
              rgba(0, 0, 0, 0.5), 
              rgba(0, 0, 0, 0.5)
            ),url(${process.env.REACT_APP_API_URL + '/projects/' + item[1].id + '/image'}
                    )`,
            backgroundSize: 'cover',
          }}
        >
          <div className="d-flex pt-4 text-ultra-light align-items-center ">
            <div className="ps-3 pe-2 pt-1">
              <img
                alt="project-icon"
                src={process.env.REACT_APP_API_URL + '/projects/' + item[1].id + '/logo'}
                className="project-icon"
                onError={logoOnErrorHandler}
              />
            </div>
            <div className="ps-3 pe-3 ">
              <div className="text-fs-project-name card-project-name">{item[1].name}</div>
              <div className="text-fs-head-sm">
                1 {item[1].token.symbol} = {item[1].token.price_in_uno} UNO
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex text-fs-body-md ps-2 pt-3">
          Total Raised:
          <div className="text-primary text-fs-head-md ps-2">
            {' '}
            {item[1].total_raised.toLocaleString('tr-TR', {
              style: 'currency',
              currency: 'USD',
              currencyDisplay: 'symbol',
              useGrouping: true,
              minimumFractionDigits: 2,
            })}
          </div>
          {new Date() > new Date(item[1].round_sale.end_date) ? (
            <div className="ms-auto d-flex align-items-center ">
              <div
                className="ended-logo px-3 me-1 d-flex align-items-center 
                                          text-fs-body-sm"
              >
                Ended
              </div>
              <img className="unopad-icon ms-1 me-1" alt="unopadmini-icon" src={unopadMiniIcon} />
            </div>
          ) : (
            <img
              className="unopad-icon ms-auto mt-2 me-1 d-flex align-items-center "
              alt="unopadmini-icon"
              src={unopadMiniIcon}
            />
          )}
        </div>

        <div class="progress mb-2 mx-2 mt-2 rounded-pill">
          <span
            class="card-progress-value 
          text-t-body-color-light"
            style={getProgressBarValueStyle()}
          >
            {item[1].percent_raised}%
          </span>
          <div
            class="progress-bar
           rounded-pill"
            style={{ width: item[1].percent_raised + '%' }}
          ></div>
        </div>

        <Table>
          <tbody>
            <tr>
              <td className="text-fs-body-md">Registrations</td>
              <td className="text-fs-body-lg text-end text-primary">
                {item[1].number_of_registrations.toLocaleString('tr-TR', {
                  useGrouping: true,
                })}
              </td>
            </tr>
            <tr>
              <td className="text-fs-body-md ">Token Price</td>
              <td className="text-fs-body-lg text-end text-primary">
                {item[1].token.price_in_usd.toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'USD',
                  currencyDisplay: 'symbol',
                  useGrouping: true,
                  minimumFractionDigits: 2,
                })}
              </td>
            </tr>
            <tr>
              <td className="text-fs-body-md">Start Date</td>

              <td className="text-fs-body-lg text-end text-primary">
                {new Date(item[1].round_sale.start_date).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </Table>
        <Table>
          <tbody className="text-fs-tag">
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <UPIcons name="BiCoin" color={mainColors['primary']} size="25" className="me-2" />
                  <div className="d-flex flex-column align-items-start">
                    <div>
                      Token Sold:{' '}
                      <span className="text-primary">
                        {' '}
                        {item[1].total_tokens_sold.toLocaleString('tr-TR', {
                          useGrouping: true,
                          minimumSignificantDigits: 1,
                        })}
                      </span>
                    </div>
                    <div>
                      Total Tokens:
                      <span className="text-primary">
                        {' '}
                        {item[1].token.total_supply.toLocaleString('tr-TR', {
                          useGrouping: true,
                          minimumSignificantDigits: 1,
                        })}
                      </span>
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

                  <div
                    className="d-flex flex-column align-items-start 
                          justify-content-center"
                  >
                    {new Date() > new Date(item[1].round_sale.end_date) ? (
                      <>Sale Ended</>
                    ) : (
                      <> On Sale</>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </NavLink>
    </Col>
  );
}
