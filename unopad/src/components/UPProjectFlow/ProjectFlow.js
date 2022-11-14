import { Col, Row } from 'react-bootstrap';

import Checkbox_Red from '../../assets/img/logo/Checkbox_Red.svg';

import './ProjectFlow.scss';

function ProjectFlow() {
  return (
    <>
      <Row className="text-white text-fs-body-md checkbox-profile-detail-row">
        <Col className='mt-2' sm={4} md={4} lg={2}>
          <div className="checkbox-row">
            <div className="text-center checkbox-row-content">
              <img alt="be" src={Checkbox_Red} />
              <div className="text-fs-head-xs checkbox-title">REGISTRATION OPENS</div>
              <div className="text-fs-head-xs checkbox-date">Sept 25th 2022</div>
              <div className="text-fs-head-xs checkbox-date">18.00</div>
            </div>
            <hr className="checkbox-line"></hr>
          </div>
        </Col>
        <Col className='mt-2' sm={4} md={4} lg={2}>
          <div className="checkbox-row">
            <div className="text-center checkbox-row-content">
              <img alt="be" src={Checkbox_Red} />
              <div className="text-fs-head-xs checkbox-title">REGISTRATION OPENS</div>
              <div className="text-fs-head-xs checkbox-date">Sept 25th 2022</div>
              <div className="text-fs-head-xs checkbox-date">18.00</div>
            </div>
            <hr className="checkbox-line"></hr>
          </div>
        </Col>
        <Col className='mt-2' sm={4} md={4} lg={2}>
          <div className="checkbox-row">
            <div className="text-center checkbox-row-content">
              <img alt="be" src={Checkbox_Red} />
              <div className="text-fs-head-xs checkbox-title">REGISTRATION OPENS</div>
              <div className="text-fs-head-xs checkbox-date">Sept 25th 2022</div>
              <div className="text-fs-head-xs checkbox-date">18.00</div>
            </div>
            <hr className="checkbox-line d-sm-none d-lg-block d-xs-block"></hr>
          </div>
        </Col>
        <Col className='mt-2' sm={4} md={4} lg={2}>
          <div className="checkbox-row">
            <div className="text-center checkbox-row-content">
              <img alt="be" src={Checkbox_Red} />
              <div className="text-fs-head-xs checkbox-title">REGISTRATION OPENS</div>
              <div className="text-fs-head-xs checkbox-date">Sept 25th 2022</div>
              <div className="text-fs-head-xs checkbox-date">18.00</div>
            </div>
            <hr className="checkbox-line"></hr>
          </div>
        </Col>
        <Col className='mt-2' sm={4} md={4} lg={2}>
          <div className="checkbox-row">
            <div className="text-center checkbox-row-content">
              <img alt="be" src={Checkbox_Red} />
              <div className="text-fs-head-xs checkbox-title">REGISTRATION OPENS</div>
              <div className="text-fs-head-xs checkbox-date">Sept 25th 2022</div>
              <div className="text-fs-head-xs checkbox-date">18.00</div>
            </div>
            <hr className="checkbox-line"></hr>
          </div>
        </Col>
        <Col className='mt-2' sm={4} md={4} lg={2}>
          <div className="checkbox-row">
            <div className="text-center checkbox-row-content">
              <img alt="be" src={Checkbox_Red} />
              <div className="text-fs-head-xs checkbox-title">REGISTRATION OPENS</div>
              <div className="text-fs-head-xs checkbox-date">Sept 25th 2022</div>
              <div className="text-fs-head-xs checkbox-date">18.00</div>
            </div>
            <hr className="checkbox-line d-none"></hr>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProjectFlow;
