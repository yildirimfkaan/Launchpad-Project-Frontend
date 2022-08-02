import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { resetAlertAction } from '../store/alert/alertActions';

const GlobalAlert = (props) => {
  const { alert } = props;
  const { text, color } = alert;

  useEffect(() => {
    let timeout = null;
    clearTimeout(timeout);
    if (alert) {
      timeout = setTimeout(() => props.dispatch(resetAlertAction()), 4000);
    }
  }, [alert]);

  if (text === '') {
    return <></>;
  }

  return <Alert variant={color}>{text}</Alert>;
};

const mapStateToProps = (state) => {
  return {
    alert: state.alertReducer.alert,
  };
};

export default connect(mapStateToProps)(GlobalAlert);
