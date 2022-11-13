import React, { useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import './UPProjectInfo.scss';

function ProjectAboutTheProject({ ...props }) {
  const { project, history } = props;
  const projectAboutContentRef = useRef(null);

  function scrollToContent(id) {
    console.log(id);
  }

  return (
    <Row>
      <Col
        lg="3"
        className="d-none d-lg-flex flex-column 
        project-about-sidebar text-fs-head-xxs text-t-body-color"
      >
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-0')}
        >
          Table of Contents
        </span>
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-1')}
        >
          1. Summary
        </span>
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-2')}
        >
          2. Heroes, Classes, and Abilities
        </span>
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-3')}
        >
          3. Gameplay
        </span>
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-4')}
        >
          4. Token Model
        </span>
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-5')}
        >
          5. Esports
        </span>
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-6')}
        >
          6. The ideal game
        </span>
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-7')}
        >
          7. Tokenomics
        </span>
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-8')}
        >
          8. Team
        </span>
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-9')}
        >
          9. Quote About Working with Unopad
        </span>
        <span
          className="mt-1 project-about-link"
          onClick={() => scrollToContent('project-about-content-10')}
        >
          10. Partners
        </span>
      </Col>
      <Col lg="9" className="project-about-content-container" ref={projectAboutContentRef}>
        <img
          id="project-about-content-0"
          className="project-about-img"
          alt="project-img"
          src={process.env.REACT_APP_API_URL + '/projects/' + project.id + '/image'}
        />
        <div id="project-about-content-1" className="mt-2">
          <div className="text-fs-head-xxs my-2">SUMMARY</div>
          <div className="text-fs-body-md text-t-body-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div id="project-about-content-2" className="mt-2">
          <div className="text-fs-head-xxs my-2">HEROES, CLASSES AND ABILITIES</div>
          <div className="text-fs-body-md text-t-body-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div id="project-about-content-3" className="mt-2">
          <div className="text-fs-head-xxs my-2">GAMEPLAY</div>
          <div className="text-fs-body-md text-t-body-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div id="project-about-content-4" className="mt-2">
          <div className="text-fs-head-xxs my-2">TOKEN MODEL</div>
          <div className="text-fs-body-md text-t-body-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div id="project-about-content-5" className="mt-2">
          <div className="text-fs-head-xxs my-2">E-SPORTS</div>
          <div className="text-fs-body-md text-t-body-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div id="project-about-content-6" className="mt-2">
          <div className="text-fs-head-xxs my-2">THE IDEAL GAME</div>
          <div className="text-fs-body-md text-t-body-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div id="project-about-content-7" className="mt-2">
          <div className="text-fs-head-xxs my-2">TOKENOMICS</div>
          <div className="text-fs-body-md text-t-body-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div id="project-about-content-8" className="mt-2">
          <div className="text-fs-head-xxs my-2">TEAM</div>
          <div className="text-fs-body-md text-t-body-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div id="project-about-content-9" className="mt-2">
          <div className="text-fs-head-xxs my-2">QUOTE ABOUT WORKING WITH UNOPAD</div>
          <div className="text-fs-body-md text-t-body-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div id="project-about-content-10" className="mt-2">
          <div className="text-fs-head-xxs my-2">PARTNERS</div>
          <div className="text-fs-body-md text-t-body-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ProjectAboutTheProject;
