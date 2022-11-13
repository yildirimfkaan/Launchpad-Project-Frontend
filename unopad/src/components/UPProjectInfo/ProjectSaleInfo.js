import React from 'react';
import { Col, Row } from 'react-bootstrap';
import UPIcons from '../UPIcons/UPIcons';
import './UPProjectInfo.scss';

function ProjectSaleInfo({ ...props }) {
  const { project, history } = props;

  return (
    <>
      <Row className="border-bottom pb-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Project Website</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <UPIcons name="BiLinkExternal" />
            <span className="text-fs-head-xxs ms-1">https://battleforgiostone.com/</span>
          </div>
        </Col>
      </Row>
      <Row className="border-bottom py-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Number of Registrations</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <span className="text-fs-head-xxs ms-1">1,349</span>
          </div>
        </Col>
      </Row>
      <Row className="border-bottom py-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Vesting</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <span className="text-fs-head-xxs ms-1">100% TGE</span>
          </div>
        </Col>
      </Row>
      <Row className="border-bottom py-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">TGE</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <span className="text-fs-head-xxs ms-1">Oct 8th 2022 at 18:30</span>
          </div>
        </Col>
      </Row>
      <Row className="pt-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Sale Contract Address</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <UPIcons name="BiLinkExternal" />
            <span className="text-fs-head-xxs ms-1">0x86CbB9...</span>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProjectSaleInfo;
