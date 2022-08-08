import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import UPProjectTable from '../../components/UPProjectTable/UPProjectTable';
import { getProjects } from '../../store/project/projectActions';
import './Sales.scss';

function Sales({ ...props }) {
  const { projects, getProjectsRequest } = props;

  useEffect(() => {
    getProjectsRequest();
  }, []);

  return (
    <Container className="sales-projects-container">
      <div
        className="sales-banner mt-2 border d-flex 
      align-items-center justify-content-center text-muted h5"
      >
        Banner
      </div>
      <div
        className="sales-quick-handler mt-2 border d-flex 
        align-items-center justify-content-center text-muted h5"
      >
        Quick Handler
      </div>
      <div className="mt-2">
        {projects && (
          <>
            <UPProjectTable {...props} />
          </>
        )}
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
    getProjectsRequest: (payload) => {
      dispatch(getProjects(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
