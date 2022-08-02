import React from 'react';
import NewContract from './NewContract';
import { getProjectByID } from '../store/project/projectActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';

function Detail({...props}) {
  const { project } = props;

  useEffect(() => {
    const payload = {
      id: props.match.params.id,
    };
    props.getProjectByID(payload);

    return () => {};
  }, []);

  useEffect(() => {
    if (project) {
      console.log('project is ready.');
    }
  }, [project]);

  return (
    <div>
      {!project ? <h1>Page is Loading.....</h1> : <NewContract {...props} />}
    </div>
  );
}

/* class Detail extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const payload = {
      id: this.props.match.params.id,
    };
    this.props.getProjectByID(payload);
  }

  render() {
    return (
      <div>
        {!this.props.project ? <h1>Page is Loading.....</h1> : <NewContract {...this.props} />}
      </div>
    );
  }
} */

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer.project,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectByID: (payload) => {
      dispatch(getProjectByID(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
