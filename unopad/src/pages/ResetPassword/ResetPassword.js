import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { resetPasswordRequest } from '../../store/account/userActions';
import './ResetPassword.scss';
import { setAlertAction } from '../../store/alert/alertActions';

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

function ResetPassword({ ...props }) {
  const { history, resetpassword, setAlert } = props;
  const [state, setState] = useState({
    data: {
      password: '',
      confirmPassword: '',
      resetToken: params.token,
    },
    errors: {},
  });
  const validate = () => {
    const { data } = state;
    const errors = {};
    if (data.password === '') errors.password = 'Password cannot be blank.';
    if (data.password.length > 32 || data.password.length < 6) {
      errors.password = 'Password should be between 6-32 characters.';
    }
    if (data.confirmPassword === '') errors.confirmPassword = 'Confirm Password cannot be blank.';
    if (data.confirmPassword !== data.password) errors.confirmPassword = 'Passwords do not match! ';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { data } = state;
    const errors = validate();

    const payload = {
      password: data.password,
      resetToken: data.resetToken,
      history: history,
    };

    if (!errors.password && !errors.confirmPassword) {
      resetpassword(payload);

      setState({
        data: {
          password: '',
          confirmPassword: '',
          resetToken: params.token,
        },
        errors: {},
      });
    } else {
      const alertText = Object.values(errors);
      setAlert({
        title: 'Warning!',
        text: alertText,
        variant: 'warning',
        outTimeMS: 3000,
      });
      setState({
        data: {
          password: '',
          confirmPassword: '',
          resetToken: params.token,
        },
        errors,
      });
    }
  };
  const handleChange = (e, targetID) => {
    setState({
      data: {
        ...state.data,
        [targetID]: e.target.value,
      },
      errors: {
        ...state.errors,
        [targetID]: '',
      },
    });
  };
  const { data, errors } = state;

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            <UPFormControl
              label="Password"
              type="password"
              id="password"
              value={data.password}
              handleChange={(e) => {
                handleChange(e, 'password');
              }}
              error={errors.password}
            />
            <UPFormControl
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={data.confirmPassword}
              handleChange={(e) => {
                handleChange(e, 'confirmPassword');
              }}
              error={errors.confirmPassword}
            />
            <Button
              type="submit"
              style={{ backgroundColor: '#365ae1', marginTop: '10px', justifyContent: 'center' }}
            >
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    resetpassword: (creds) => {
      dispatch(resetPasswordRequest(creds));
    },
    setAlert: (payload) => {
      dispatch(setAlertAction(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
