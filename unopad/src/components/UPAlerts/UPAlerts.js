import React from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';
import './UPAlerts.scss';
import { resetAlertAction } from '../../store/alert/alertActions';

const UPAlerts = (props) => {
  const { alert } = props;
  const { title, time, variant = 'danger', outTimeMS } = alert;
  let text = alert.text;

  function closeAlerts() {
    props.dispatch(resetAlertAction());
  }

  if (text === '') {
    return <></>;
  }

  if (text === undefined || text === null) {
    text = 'Hmm... Someting went wrong!';
  }

  return (
    <Toast
      className="up-toast"
      bg={variant}
      autohide
      animation={true}
      onClose={() => closeAlerts()}
      delay={outTimeMS ? outTimeMS : 4000}
    >
      {title && (
        <Toast.Header bg={variant}>
          <strong className="me-auto">{title}</strong>
          {time && <small>{time}</small>}
        </Toast.Header>
      )}
      <Toast.Body className={'up-toast-body text-white'}>
        <span>{text}</span>
      </Toast.Body>
      <span
        className="alerts-duration bg-white rounded"
        style={{ animationDuration: (outTimeMS ? outTimeMS : 4000) / 1000 + 's' }}
      ></span>
    </Toast>
  );
};

const mapStateToProps = (state) => {
  return {
    alert: state.alertReducer.alert,
  };
};

export default connect(mapStateToProps)(UPAlerts);
