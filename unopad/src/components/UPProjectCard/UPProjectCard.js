import { Table, NavLink, Row, Col, Pagination, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './UPProjectCard.scss';
import UPIcons from '../UPIcons/UPIcons';
import { mainColors } from '../../helpers/colors';
// import metamaskIcon from '../UPWalletAccountDetailModal/metamask-icon.png';
// import ProgressBar from 'react-bootstrap/ProgressBar';
import unopadMiniIcon from '../../assets/img/logo/unopad-logo-mini.png';
import unopadCardDefaultBackground from '../../assets/img/background/card-title-background.png';
import unopadCardDefaultLogo from '../../assets/img/logo/unopad-logo-white.png';

import { useEffect, useState } from 'react';

export default function Card1(props) {
  const { projects } = props;
  const { status } = props;
  console.log('status from card: ', status);

  const maxRowCountPerPage = 9;
  const maxShowingPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [renderedProjects, setRenderedProjects] = useState([]);
  const [renderedPages, setRenderedPages] = useState([]);
  const [lastPageOfPagination, setLastPageOfPagination] = useState(maxShowingPage);
  useEffect(() => {
    if (projects?.length) {
      setCurrentPage(1);
      const tempPages = [];
      for (let index = 0; index < Math.ceil(projects.length / maxRowCountPerPage); index++) {
        tempPages.push(index + 1);
      }
      setPages([...tempPages]);
      setRenderedPages([
        ...tempPages.slice(lastPageOfPagination - maxShowingPage, lastPageOfPagination),
      ]);
    }
  }, [projects]);

  useEffect(() => {
    if (projects?.length && currentPage) {
      const firstIndex = maxRowCountPerPage * currentPage - maxRowCountPerPage;
      const lastIndex = maxRowCountPerPage * currentPage;
      const tempRendered = projects?.slice(firstIndex, lastIndex);
      setRenderedProjects([...tempRendered]);
    }
  }, [currentPage, projects]);

  const setPaginationPages = (page) => {
    if (
      renderedPages.findIndex((p) => p === page + 1) === -1 &&
      pages.slice(lastPageOfPagination + 1 - maxShowingPage, lastPageOfPagination + 1).length ===
        maxShowingPage
    ) {
      setLastPageOfPagination(lastPageOfPagination + 1);
      setRenderedPages(
        pages.slice(lastPageOfPagination + 1 - maxShowingPage, lastPageOfPagination + 1),
      );
    } else if (
      renderedPages.findIndex((p) => p === page - 1) === -1 &&
      pages.slice(lastPageOfPagination - 1 - maxShowingPage, lastPageOfPagination - 1).length ===
        maxShowingPage
    ) {
      setLastPageOfPagination(lastPageOfPagination - 1);
      setRenderedPages(
        pages.slice(lastPageOfPagination - 1 - maxShowingPage, lastPageOfPagination - 1),
      );
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
    if (page === lastPageOfPagination) {
      setPaginationPages(page);
    } else if (page === lastPageOfPagination - maxShowingPage + 1) {
      setPaginationPages(page);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
    setLastPageOfPagination(maxShowingPage);
    setRenderedPages(pages.slice(0, maxShowingPage));
  };

  const prevPage = () => {
    if (currentPage - 1 !== 0) {
      setCurrentPage(currentPage - 1);
      setPaginationPages(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage + 1 <= pages.length) {
      setCurrentPage(currentPage + 1);
      setPaginationPages(currentPage + 1);
    }
  };

  const lastPage = () => {
    setCurrentPage(pages.length);
    if (pages.length > maxShowingPage) {
      setLastPageOfPagination(pages.length);
      setRenderedPages(pages.slice(pages.length - maxShowingPage, pages.length));
    }
  };
  const logoOnErrorHandler = (event) => {
    event.currentTarget.src = unopadCardDefaultLogo;
    event.currentTarget.className = 'project-icon';
  };
  return (
    <Row className="justify-content-center mt-5">
      {Object.entries(renderedProjects).map((item, index) => {
        if (status == item[1].is_active) {
          if (currentPage * index < currentPage * maxRowCountPerPage) {
            return (
              <Col className="d-flex flex-column pb-4" lg={4} sm={12} md={6}>
                <NavLink as={Link} to={'/project/' + item[1].id} className="shadow">
                  <div
                    className="project-img-div pt-5"
                    style={{
                      background: `url(${
                        process.env.REACT_APP_API_URL + '/projects/' + item[1].id + '/image'
                      }
                    ),url(${unopadCardDefaultBackground}
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
                        <img
                          className="unopad-icon ms-1 me-1"
                          alt="unopadmini-icon"
                          src={unopadMiniIcon}
                        />
                      </div>
                    ) : (
                      <img
                        className="unopad-icon ms-auto mt-2 me-1 d-flex align-items-center "
                        alt="unopadmini-icon"
                        src={unopadMiniIcon}
                      />
                    )}
                  </div>
                  <div>
                    <ProgressBar
                      className="project-progress-bar mt-3 mb-3 mx-2"
                      style={{ height: '30px' }}
                      now={85}
                      label={'Sale: 92.45%'}
                    />
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
                            <UPIcons
                              name="BiCoin"
                              color={mainColors['primary']}
                              size="25"
                              className="me-2"
                            />
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
        }
      })}
      {pages?.length > 1 ? (
        <Pagination className="d-flex justify-content-center mt-5">
          <Pagination.First onClick={() => firstPage()} />
          <Pagination.Prev onClick={() => prevPage()} />
          {renderedPages.map((page, index) => {
            return (
              <Pagination.Item active={page === currentPage} onClick={() => changePage(page)}>
                {page}
              </Pagination.Item>
            );
          })}
          <Pagination.Next onClick={() => nextPage()} />
          <Pagination.Last onClick={() => lastPage()} />
        </Pagination>
      ) : null}
    </Row>
  );
}
