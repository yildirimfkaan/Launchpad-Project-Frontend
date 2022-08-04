/* eslint-disable max-len */
import React from 'react';
import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { walletAccountHistoryModalAction } from '../store/wallet/walletActions';
import { Button, Col, Container, Row } from 'react-bootstrap';

function walletAccountHistoryModal({ ...props }) {
  const { walletAccountHistoryModal, walletAccountHistory, walletAccountHistoryModalRequest } =
    props;

  const handleClose = () => {
    walletAccountHistoryModalRequest(false);
  };

  console.log('history', walletAccountHistory);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Modal show={walletAccountHistoryModal} fullscreen={true} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Wallet Account History</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col>
                      <Table striped bordered hover size="sm">
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
                          {walletAccountHistory?.map((item, index) => (
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
                                  variant="info"
                                >
                                  {' '}
                                  {item.hash.slice(0, 10)}{' '}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>

              <Modal.Footer>footer</Modal.Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(walletAccountHistoryModal);
