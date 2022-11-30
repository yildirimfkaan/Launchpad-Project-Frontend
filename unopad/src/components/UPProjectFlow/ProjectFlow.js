import { Col, Row } from 'react-bootstrap';

import Checkbox_Red from '../../assets/img/logo/Checkbox_Red.svg';

import './ProjectFlow.scss';

function ProjectFlow({ ...props }) {
  const item = props.project;
  const rounds = [
    'round_registration',
    'round_validation',
    'round_staking',
    'round_privatesale',
    'round_publicsale',
  ];
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
        !item.round_publicsale ? (
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
          </Col>
        ) : (
          <></>
        )}
        {rounds.map((object, i) => {
          let round_name = object.toString().split('_')[1].toUpperCase();
          return item[object] ? (
            <Col className="mt-2" sm={4} md={4} lg={2}>
              <div className="checkbox-row">
                <div className="text-center checkbox-row-content">
                  <img alt="be" src={Checkbox_Red} />
                  <div className="text-fs-head-xs checkbox-title">{round_name} ROUND</div>
                  <div className="text-fs-head-xs checkbox-date">
                    {new Date(item[object].start_date).toLocaleDateString()}{' '}
                    {new Date(item[object].start_date).toLocaleTimeString()}
                  </div>
                  <div className="text-fs-head-xs checkbox-date">
                    {new Date(item[object].end_date).toLocaleDateString()}{' '}
                    {new Date(item[object].end_date).toLocaleTimeString()}
                  </div>
                </div>
                {i == 2 ? (
                  <hr className="checkbox-line d-sm-none d-lg-block d-xs-block"></hr>
                ) : (
                  <hr className="checkbox-line"></hr>
                )}
              </div>
            </Col>
          ) : (
            <></>
          );
        })}
        <Col className="mt-2" sm={4} md={4} lg={2}>
          <div className="checkbox-row">
            <div className="text-center checkbox-row-content">
              <img alt="be" src={Checkbox_Red} />
              <div className="text-fs-head-xs checkbox-title">SALE END</div>
              <div className="text-fs-head-xs checkbox-date">
                {new Date(item.round_sale.end_date).toLocaleDateString()}{' '}
                {new Date(item.round_sale.end_date).toLocaleTimeString()}
              </div>
            </div>
            <hr className="checkbox-line d-none"></hr>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProjectFlow;
