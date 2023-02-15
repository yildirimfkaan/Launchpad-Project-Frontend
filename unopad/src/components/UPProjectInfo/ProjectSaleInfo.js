/* eslint-disable max-len */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import UPIcons from '../UPIcons/UPIcons';
import './UPProjectInfo.scss';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
            <a href={`${project.website_url}`}className="d-flex text-fs-head-xxs text-dark" target='_blank' 
            >
            <span className="text-fs-head-xxs ms-1">{project.website_url}</span>
            </a>
          </div>
        </Col>
      </Row>
      <Row className="border-bottom py-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Number of Registrations</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <span className="text-fs-head-xxs ms-1">{project.number_of_registrations}</span>
          </div>
        </Col>
      </Row>
      {/* <Row className="border-bottom py-2">
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
      </Row> */}
      <Row className="pt-2">
        <Col sm="6">
          <span className="text-fs-body-md text-t-body-color">Sale Contract Address</span>
        </Col>
        <Col sm="6">
          <div className="d-flex align-items-center justify-content-sm-end">
            <a href={`https://testnet.bscscan.com/address/${project?.token?.presale_contract?.contract_address}`}className="d-flex text-fs-head-xxs text-dark" target='_blank' 
            ><UPIcons name="BiLinkExternal" />
            <span
              className="text-fs-head-xxs 
            ms-1" 
            >
               <OverlayTrigger placement='bottom' overlay={<Tooltip id="tooltip-disabled">{project?.token?.presale_contract?.contract_address}</Tooltip>}>
               <span className="d-inline-block">
               {project?.token?.presale_contract?.contract_address.slice(0,6)}...
              {project?.token?.presale_contract?.contract_address.slice(36,42)}
      </span>
              
    </OverlayTrigger>
              
            </span>
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProjectSaleInfo;
