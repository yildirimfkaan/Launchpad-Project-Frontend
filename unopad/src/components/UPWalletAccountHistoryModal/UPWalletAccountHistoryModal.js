/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { walletAccountHistoryModalAction } from '../../store/wallet/walletActions';
import { Button, Col, Container, Pagination, Row } from 'react-bootstrap';
import './UPWalletAccountHistoryModal.scss';

function WalletAccountHistoryModal({ ...props }) {
  const { walletAccountHistoryModal, walletAccountHistory, walletAccountHistoryModalRequest } =
    props;

  const maxRowCountPerPage = 10;
  const maxShowingPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [renderedHistory, setRenderedHistory] = useState([]);
  const [renderedPages, setRenderedPages] = useState([]);
  const [lastPageOfPagination, setLastPageOfPagination] = useState(maxShowingPage);

  useEffect(() => {
    if (walletAccountHistory?.length) {
      setCurrentPage(1);
      const tempPages = [];
      for (
        let index = 0;
        index < Math.ceil(walletAccountHistory.length / maxRowCountPerPage);
        index++
      ) {
        tempPages.push(index + 1);
      }
      setPages([...tempPages]);
      setRenderedPages([
        ...tempPages.slice(lastPageOfPagination - maxShowingPage, lastPageOfPagination),
      ]);
    }
  }, [walletAccountHistory]);

  useEffect(() => {
    if (walletAccountHistory?.length && currentPage) {
      const firstIndex = maxRowCountPerPage * currentPage - maxRowCountPerPage;
      const lastIndex = maxRowCountPerPage * currentPage;
      const tempRendered = walletAccountHistory?.slice(firstIndex, lastIndex);
      setRenderedHistory([...tempRendered]);
    }
  }, [currentPage, walletAccountHistory]);

  const handleClose = () => {
    walletAccountHistoryModalRequest(false);
  };

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
  
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Modal
              className="wallet-account-history-modal"
              show={walletAccountHistoryModal}
              size="xl"
              onHide={handleClose}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Wallet Account History</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {renderedHistory.length ? (
                  <Container className="wallet-account-history-table">
                    <Row>
                      <Col>
                        <Table className='sales-table-design' bordered hover responsive="xl">
                          <thead>
                            <tr>
                              <th>blockNumber</th>
                              <th>From</th>
                              <th>To</th>
                              <th>Value</th>
                              <th>Hash</th>
                            </tr>
                          </thead>
                          <tbody>
                            {renderedHistory?.map((item, index) => {
                              if (currentPage * index < currentPage * maxRowCountPerPage) {
                                
                                return (
                                  
                                  <tr>
                                    <td>{item.blockNumber}</td>
                                    <td>
                                      {item.from.slice(0, 10)}...{item.from.slice(30, 42)}
                                    </td>
                                    <td>
                                      {item.to.slice(0, 10)}...{item.to.slice(30, 42)}
                                    </td>
                                    <td>{item.value}</td>
                                    <td>
                                      {' '}
                                      <Button
                                        href={'https://testnet.bscscan.com/tx/' + item.hash}
                                        target="_blank"
                                        variant={item.txreceipt_status == 1 ? ("success") : ("danger")}
                                      >
                                        {' '}
                                        {item.hash.slice(0, 10)}{' '}
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              }
                            })}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <div className="d-flex align-items-center justify-content-center text-muted h4">
                    No history records found
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer className="border-top-0 justify-content-center">
                {pages?.length ? (
                  <Pagination>
                    <Pagination.First onClick={() => firstPage()} />
                    <Pagination.Prev onClick={() => prevPage()} />
                    {renderedPages.map((page, index) => {
                      return (
                        <Pagination.Item
                          active={page === currentPage}
                          onClick={() => changePage(page)}
                        >
                          {page}
                        </Pagination.Item>
                      );
                    })}
                    <Pagination.Next onClick={() => nextPage()} />
                    <Pagination.Last onClick={() => lastPage()} />
                  </Pagination>
                ) : null}
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    walletAccountHistoryModal: state.walletReducer.walletAccountHistoryModal,
    walletAccountHistory: state.walletReducer.walletAccountHistory,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // connectWalletRequest: (payload) => {
    //   dispatch(connectWallet(payload));
    // },
    walletAccountHistoryModalRequest: (payload) => {
      dispatch(walletAccountHistoryModalAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletAccountHistoryModal);
