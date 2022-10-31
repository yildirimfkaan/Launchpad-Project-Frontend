import UPProjectCard from '../../components/UPProjectCard/UPProjectCard';
import React, { useEffect } from 'react';
import { getProjects } from '../../store/project/projectActions';
import { connect } from 'react-redux';
import UPQuickHandler from '../../components/UPQuickHandler/UPQuickHandler';
import { Container } from 'react-bootstrap';
import './Launchpad.scss';
import { quickHandlerImages } from '../../helpers/quickHandlerImages';
import TripleCard from '../../components/UPTripleCard/TripleCard';

function Launchpad({ ...props }) {
  const { getProjects, projects } = props;

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Container>
      <br></br>
      <UPQuickHandler
        isSignUpAndKYC={true}
        signUpAndKYCImg={quickHandlerImages.lpSignUpAndKYCImg}
        isVerifyWallet={true}
        verifyWalletImg={quickHandlerImages.lpVerifyWalletImg}
        isStakeUnoToken={true}
        stakeUnoTokenImg={quickHandlerImages.lpStakeUnoTokenImg}
        registerForSaleImg={quickHandlerImages.lpRegisterForProject}
        href="#launchpad-projects"
        history={props.history}
      />
      {!projects ? <h1>Page is Loading.....</h1> : <UPProjectCard {...props} />}
      <TripleCard/>
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
