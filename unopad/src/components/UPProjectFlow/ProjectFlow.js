import { Col, Row } from 'react-bootstrap';

import Checkbox_Red from '../../assets/img/logo/Checkbox_Red.svg';

import './ProjectFlow.scss';

function ProjectFlow({ ...props }) {
  const item = props.project;
  return (
    <>
      <Row
        className="text-white text-fs-body-md checkbox-profile-detail-row 
      justify-content-center mb-5"
      >
        {!item.round_registration &&
          !item.round_validation &&
          !item.round_staking &&
          !item.round_privatesale &&
          !item.round_publicsale ?(
          <Col className="mt-2" sm={4} md={4} lg={2}>
          <div className="checkbox-row">
            <div className="text-center checkbox-row-content">
              <img alt="be" src={Checkbox_Red} />
              <div className="text-fs-head-xs checkbox-title">SALE START</div>
              <div className="text-fs-head-xs checkbox-date">
                {new Date(item.round_sale.start_date).toLocaleDateString()}{' '}
                {new Date(item.round_sale.start_date).toLocaleTimeString()}
              </div>
            </div>
            <hr className="checkbox-line"></hr>
          </div>
        </Col>):(<></>)}
        
        {item.round_registration ? (
          <Col className="mt-2" sm={4} md={4} lg={2}>
            <div className="checkbox-row">
              <div className="text-center checkbox-row-content">
                <img alt="be" src={Checkbox_Red} />
                <div className="text-fs-head-xs checkbox-title">REGISTRATION ROUND</div>
                <div className="text-fs-head-xs checkbox-date">
                  {new Date(item.round_registration.start_date).toLocaleDateString()}{' '}
                  {new Date(item.round_registration.start_date).toLocaleTimeString()}
                </div>
                <div className="text-fs-head-xs checkbox-date">
                  {new Date(item.round_registration.end_date).toLocaleDateString()}{' '}
                  {new Date(item.round_registration.end_date).toLocaleTimeString()}
                </div>
              </div>
              <hr className="checkbox-line"></hr>
            </div>
          </Col>
        ) : (
          <></>
        )}
        {item.round_validation ? (
          <Col className="mt-2" sm={4} md={4} lg={2}>
            <div className="checkbox-row ">
              <div className="text-center checkbox-row-content">
                <img alt="be" src={Checkbox_Red} />
                <div className="text-fs-head-xs checkbox-title">VALIDATION ROUND</div>
                <div className="text-fs-head-xs checkbox-date">
                  {new Date(item.round_validation.start_date).toLocaleDateString()}{' '}
                  {new Date(item.round_validation.start_date).toLocaleTimeString()}
                </div>
                <div className="text-fs-head-xs checkbox-date">
                  {new Date(item.round_validation.end_date).toLocaleDateString()}{' '}
                  {new Date(item.round_validation.end_date).toLocaleTimeString()}
                </div>
              </div>
              <hr className="checkbox-line"></hr>
            </div>
          </Col>
        ) : (
          <></>
        )}
        {item.round_staking ? (
          <Col className="mt-2 " sm={4} md={4} lg={2}>
            <div className="checkbox-row">
              <div className="text-center checkbox-row-content">
                <img alt="be" src={Checkbox_Red} />
                <div className="text-fs-head-xs checkbox-title">STAKING ROUND</div>
                <div className="text-fs-head-xs checkbox-date">
                  {new Date(item.round_staking.start_date).toLocaleDateString()}{' '}
                  {new Date(item.round_staking.start_date).toLocaleTimeString()}
                </div>
                <div className="text-fs-head-xs checkbox-date">
                  
                  {new Date(item.round_staking.end_date).toLocaleDateString()}{' '}
                  {new Date(item.round_staking.end_date).toLocaleTimeString()}
                </div>
              </div>
              <hr className="checkbox-line d-sm-none d-lg-block d-xs-block"></hr>
            </div>
          </Col>
        ) : (
          <></>
        )}
        {item.round_privatesale ? (
          <Col className="mt-2" sm={4} md={4} lg={2}>
            <div className="checkbox-row">
              <div className="text-center checkbox-row-content">
                <img alt="be" src={Checkbox_Red} />
                <div className="text-fs-head-xs checkbox-title">PRIVATE SALE</div>
                <div className="text-fs-head-xs checkbox-date">
                  {new Date(item.round_privatesale.start_date).toLocaleDateString()}{' '}
                  {new Date(item.round_privatesale.start_date).toLocaleTimeString()}
                </div>
                <div className="text-fs-head-xs checkbox-date">
                  {new Date(item.round_privatesale.end_date).toLocaleDateString()}{' '}
                  {new Date(item.round_privatesale.end_date).toLocaleTimeString()}
                </div>
              </div>
              <hr className="checkbox-line"></hr>
            </div>
          </Col>
        ) : (
          <></>
        )}
        {item.round_publicsale ? (
          <Col className="mt-2" sm={4} md={4} lg={2}>
            <div className="checkbox-row">
              <div className="text-center checkbox-row-content">
                <img alt="be" src={Checkbox_Red} />
                <div className="text-fs-head-xs checkbox-title">PUBLIC SALE</div>
                <div className="text-fs-head-xs checkbox-date">
                  {new Date(item.round_publicsale.start_date).toLocaleDateString()}{' '}
                  {new Date(item.round_publicsale.start_date).toLocaleTimeString()}
                </div>
                <div className="text-fs-head-xs checkbox-date">
                  {new Date(item.round_publicsale.end_date).toLocaleDateString()}{' '}
                  {new Date(item.round_publicsale.end_date).toLocaleTimeString()}
                </div>
              </div>
              <hr className="checkbox-line"></hr>
            </div>
          </Col>
        ) : (
          <></>
        )}

        <Col className="mt-2" sm={4} md={4} lg={2}>
          <div className="checkbox-row">
            <div className="text-center checkbox-row-content">
              <img alt="be" src={Checkbox_Red} />
              <div className="text-fs-head-xs checkbox-title">SALE END</div>
              <div className="text-fs-head-xs checkbox-date">
                {new Date(item.round_sale.end_date).toLocaleDateString()}{' '}
                {new Date(item.round_sale.end_date).toLocaleTimeString()}
              </div>
              {/* <div className="text-fs-head-xs checkbox-date"></div> */}
            </div>
            <hr className="checkbox-line d-none"></hr>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProjectFlow;
