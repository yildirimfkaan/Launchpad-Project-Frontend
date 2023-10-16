import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import TeamMemberLogo4 from '../../../src/assets/img/meet-team-images/meet-team-4.png';
import TeamMemberLogo3 from '../../../src/assets/img/meet-team-images/meet-team-3.png';
import TeamMemberLogo2 from '../../../src/assets/img/meet-team-images/meet-team-2.png';
import TeamMemberLogo1 from '../../../src/assets/img/meet-team-images/meet-team-1.png';

import './MeetTeam.scss';

function MeetTeam() {
  return (
    <Container className="mx-auto">
      <Row className="d-flex justify-content-center align-items-center">
        <div className="text-black text-fs-head-lg title">MEET THE TEAM</div>
        <div className="text-black text-fs-body-md text my-2">
          Leverage on any tokens with a protocol trusted with billions for its performance and
          reliability.
        </div>
      </Row>
      <Row className="d-flex justify-content-center align-items-center mt-2 px-1 py-2">
        <Col
          className="justify-content-center 
        align-items-center text-center mt-4 ps-4"
          sm={12}
          md={6}
          lg={3}
        >
          <img src={TeamMemberLogo2} alt="Logo" heigth={120} width={180} />
          <div className="text-fs-body-md">Jack Carver</div>
          <div className="text-fs-body-sm">Marketing Manager</div>
        </Col>
        <Col
          className="justify-content-center 
        align-items-center text-center mt-4 ps-4"
          sm={12}
          md={6}
          lg={3}
        >
          <img src={TeamMemberLogo4} alt="Logo" heigth={120} width={180} />
          <div className="text-fs-body-md">Jack Carver</div>
          <div className="text-fs-body-sm">CEO & Founder</div>
        </Col>
        <Col
          className="justify-content-center 
        align-items-center text-center mt-4 ps-4"
          sm={12}
          md={6}
          lg={3}
        >
          <img src={TeamMemberLogo1} alt="Logo" heigth={120} width={180} />
          <div className="text-fs-body-md">Jack Carver</div>
          <div className="text-fs-body-sm">CEO & Founder</div>
        </Col>
        <Col
          className="justify-content-center 
        align-items-center text-center mt-4 ps-4"
          sm={12}
          md={6}
          lg={3}
        >
          <img src={TeamMemberLogo3} alt="Logo" heigth={120} width={180} />
          <div className="text-fs-body-md">Jack Carver</div>
          <div className="text-fs-body-sm">Product Designer</div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center mt-2 px-1 py-2">
        <Col
          className="justify-content-center 
        align-items-center text-center mt-4 ps-4"
          sm={6}
          md={4}
          lg={2}
        >
          <img src={TeamMemberLogo2} alt="Logo" heigth={80} width={120} />
          <div className="text-fs-body-md">Jack Carver</div>
          <div className="text-fs-body-sm">Marketing Manager</div>
        </Col>
        <Col
          className="justify-content-center 
        align-items-center text-center mt-4 ps-4"
          sm={6}
          md={4}
          lg={2}
        >
          <img src={TeamMemberLogo2} alt="Logo" heigth={80} width={120} />
          <div className="text-fs-body-md">Jack Carver</div>
          <div className="text-fs-body-sm">Marketing Manager</div>
        </Col>
        <Col
          className="justify-content-center 
        align-items-center text-center mt-4 ps-4"
          sm={6}
          md={4}
          lg={2}
        >
          <img src={TeamMemberLogo2} alt="Logo" heigth={80} width={120} />
          <div className="text-fs-body-md">Jack Carver</div>
          <div className="text-fs-body-sm">Marketing Manager</div>
        </Col>
        <Col
          className="justify-content-center 
        align-items-center text-center mt-4 ps-4"
          sm={6}
          md={4}
          lg={2}
        >
          <img src={TeamMemberLogo2} alt="Logo" heigth={80} width={120} />
          <div className="text-fs-body-md">Jack Carver</div>
          <div className="text-fs-body-sm">Marketing Manager</div>
        </Col>
        <Col
          className="justify-content-center 
        align-items-center text-center mt-4 ps-4"
          sm={6}
          md={4}
          lg={2}
        >
          <img src={TeamMemberLogo2} alt="Logo" heigth={80} width={120} />
          <div className="text-fs-body-md">Jack Carver</div>
          <div className="text-fs-body-sm">Marketing Manager</div>
        </Col>
        <Col
          className="justify-content-center 
        align-items-center text-center mt-4 ps-4"
          sm={6}
          md={4}
          lg={2}
        >
          <img src={TeamMemberLogo2} alt="Logo" heigth={80} width={120} />
          <div className="text-fs-body-md">Jack Carver</div>
          <div className="text-fs-body-sm">Marketing Manager</div>
        </Col>
      </Row>
    </Container>
  );
}

export default MeetTeam;
