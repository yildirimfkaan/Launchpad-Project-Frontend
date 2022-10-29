import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = (props) => {
  if (props.user || JSON.parse(localStorage.getItem('user'))) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(UserRoute);
