import UPProjectCard from '../../components/UPProjectCard/UPProjectCard';
import React, { useEffect } from 'react';
import { getProjects } from '../../store/project/projectActions';
import { connect } from 'react-redux';
import UPQuickHandler from '../../components/UPQuickHandler/UPQuickHandler';
import { Container } from 'react-bootstrap';
import './Launchpad.scss';

function Launchpad({ ...props }) {
  const { getProjects, projects } = props;

  useEffect(() => {
    getProjects();  
  }, []);

  return (
    <Container>
      <div
        className="sales-banner mt-2 border d-flex 
      align-items-center justify-content-center text-muted h5"
      >
        Banner
      </div>
      <br></br>
      <UPQuickHandler
        isSignUpAndKYC={true}
        isVerifyWallet={true}
        isStakeUnoToken={true}
        href="#launchpad-projects"
        history={props.history}
      />
      {!projects ? (
        <h1>Page is Loading.....</h1>
      ) : (
        <div id="launchpad-projects" class="d-flex">
          <UPProjectCard {...props} />{' '}
        </div>
      )}
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    projects: state.projectReducer.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (payload) => {
      dispatch(getProjects(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Launchpad);
