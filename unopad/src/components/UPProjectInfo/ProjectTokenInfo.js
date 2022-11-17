import React from 'react';
import { Col, Row } from 'react-bootstrap';
import UPIcons from '../UPIcons/UPIcons';
import './UPProjectInfo.scss';

function ProjectTokenInfo({ ...props }) {
  const { project, history } = props;

  return (
    <>
<Row className="border-bottom pb-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Token Name</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <UPIcons name="BiLinkExternal" />
            <span className="text-fs-head-xxs ms-1">{project.name}</span>
          </div>
        </Col>
      </Row>
      <Row className="border-bottom py-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Token Symbol</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <span className="text-fs-head-xxs ms-1">{project.token.symbol}</span>
          </div>
        </Col>
      </Row>
      <Row className="border-bottom py-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Token Decimals</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <span className="text-fs-head-xxs ms-1">{project.token.decimals}</span>
          </div>
        </Col>
      </Row>
      <Row className="border-bottom py-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Total Supply</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <span className="text-fs-head-xxs ms-1">{project.token.total_supply}</span>
          </div>
        </Col>
      </Row>
      <Row className="pt-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Token Address</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <UPIcons name="BiLinkExternal" />
            <span
              className="text-fs-head-xxs 
            ms-1"
            >
              {project.token.address}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProjectTokenInfo;