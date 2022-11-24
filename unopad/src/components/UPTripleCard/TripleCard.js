/* eslint-disable max-len */
// import { Col } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CheckBox from '../../assets/img/logo/Checkbox.png';
import './TripleCard.scss';

function TripleCard() {
  return (
    <Row className="d-flex mt-5">
      <Col className="d-flex align-items-center text-center mb-4" sm={12} md={6} lg={4}>
        <Card.Body className="d-flex justify-content-center align-items-center triple-column">
          <div className="col-4">
            <img
              className="mb-5 m-auto checkbox-img"
              alt="CheckBox"
              src={CheckBox}
              height={120}
              width={100}
            />
          </div>
          <div className="col-6">
            <Card.Title className="d-flex justify-content-center text-fs-head-xs">
              FAIR AND EQUITABLE FUNDRAISING
            </Card.Title>
            <Card.Text className="d-flex justify-content-center text-fs-body-md">
              Leverage on any tokens with a protocol trusted with billions for its performance.
            </Card.Text>
          </div>
        </Card.Body>
      </Col>
      <Col className="d-flex align-items-center text-center mb-4" sm={12} md={6} lg={4}>
        <Card.Body className="d-flex justify-content-center align-items-center triple-column">
          <div className="col-4">
            <img
              className="mb-5 m-auto checkbox-img"
              alt="CheckBox"
              src={CheckBox}
              height={120}
              width={100}
            />
          </div>
          <div className="col-6">
            <Card.Title className="d-flex justify-content-center text-fs-head-xs">
              FAIR AND EQUITABLE FUNDRAISING
            </Card.Title>
            <Card.Text className="d-flex justify-content-center text-fs-body-md">
              Leverage on any tokens with a protocol trusted with billions for its performance.
            </Card.Text>
          </div>
        </Card.Body>
      </Col>
      <Col className="d-flex align-items-center text-center mb-4" sm={12} md={6} lg={4}>
        <Card.Body className="d-flex justify-content-center align-items-center triple-column">
          <div className="col-4">
            <img
              className="mb-5 m-auto checkbox-img"
              alt="CheckBox"
              src={CheckBox}
              height={120}
              width={100}
            />
          </div>
          <div className="col-6">
            <Card.Title className="d-flex justify-content-center text-fs-head-xs">
              FAIR AND EQUITABLE FUNDRAISING
            </Card.Title>
            <Card.Text className="d-flex justify-content-center text-fs-body-md">
              Leverage on any tokens with a protocol trusted with billions for its performance.
            </Card.Text>
          </div>
        </Card.Body>
      </Col>
    </Row>
  );
}

export default TripleCard;
