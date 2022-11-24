import UPProjectCard from '../../components/UPProjectCard/UPProjectCard';
import React, { useEffect } from 'react';
import { getProjects } from '../../store/project/projectActions';
import { connect } from 'react-redux';
import UPQuickHandler from '../../components/UPQuickHandler/UPQuickHandler';
import { Container } from 'react-bootstrap';
import './Launchpad.scss';
import { quickHandlerImages } from '../../helpers/quickHandlerImages';
import TripleCard from '../../components/UPTripleCard/TripleCard';
import SpinnerUnopad from '../../components/UPSpinnerUnopad/UPSpinnerUnopad';

function Launchpad({ ...props }) {
  const { getProjects, projects } = props;

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Container>
      <br></br>

      <div className="completed-sales-div align-items-center justify-content-center">
        <div>
          <div className="d-flex align-items-center justify-content-center text-fs-head-lg mb-3">
            LAUNCHPAD
          </div>
          <div
            className="d-flex align-items-center justify-content-center text-fs-body-lg 
        text-t-body-color mb-3 completed-sales-description"
          >
            <span>
              Leverage on any tokens with a protocol trusted with billions for its performance and
              reliability.
            </span>
          </div>
        </div>
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
        <div className="completed-sales-title-container">
          <div className="d-flex align-items-center justify-content-center text-fs-head-lg my-5">
            COMPLETED SALES
          </div>
          <div
            className="d-flex align-items-center justify-content-center text-fs-body-lg 
        text-t-body-color mb-5 completed-sales-description"
          >
            <span>
              Leverage on any tokens with a protocol trusted with billions for its performance and
              reliability.
            </span>
          </div>
        </div>
        {!projects ? <SpinnerUnopad/> : <UPProjectCard {...props} />}
        <TripleCard />
      </div>
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
