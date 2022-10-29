import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './BannerSales.scss';
import Form from 'react-bootstrap/Form';
import { BsSearch } from 'react-icons/bs';
import { InputGroup } from 'react-bootstrap';

function BannerSales() {
  return (
    <Container className="sales-banner">
      <Row className="text-white text-fs-head-xs">
        <Col>Home / Sales</Col>
      </Row>
      <Row className="text-white text-fs-head-lg mt-4" style={{ width: '29%' }}>
        <Col>Unopad Sales</Col>
      </Row>
      <Row className="text-white text-fs-body-md mt-4 text-center " style={{ width: '100%' }}>
        <Col>
          <InputGroup className="search-sales-design">
            <InputGroup.Text id="basic-addon1" className="search-sales-icon">
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              className="search-sales-input text-fs-body-sm"
              type="text"
              placeholder="Search by project name, token symbol or token contract adress..."
              aria-label="text"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default BannerSales;
