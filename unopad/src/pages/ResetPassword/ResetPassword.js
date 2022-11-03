/* eslint-disable max-len */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { resetPasswordRequest } from '../../store/account/userActions';
import { setAlertAction } from '../../store/alert/alertActions';
import './ResetPassword.scss';
import { NavLink } from 'react-router-dom';

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
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="public-resetpw-layout-col d-flex justify-content-center align-items-center bg-white px-1 py-2">
          <div className="public-resetpw-layout-image d-md-flex d-none flex-column justify-content-center align-items-center bg-tertiary px-1 py-2">
            <div className="text-fs-head-lg text-center text-light px-2">
              Welcome to the future of <div className="text-primary">fundraising</div>
            </div>
            <div className="text-fs-body-md text-center text-light px-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center aling-items-center px-4 mx-2 public-resetpw-layout-form">
            <Form onSubmit={handleSubmit}>
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
              <Button className="mb-4 mt-4 bg-unopad-primary col-sm-12" type="submit">
                Reset Password
              </Button>
            </Form>

            {/* <NavLink
              className="forgotpassword-link d-flex justify-content-center m-2 text-primary"
              to="/forgotpassword"
            >
              Forgot Password?
            </NavLink> */}

            <Col className="m-1 d-flex justify-content-center">
              <NavLink className="text-fs-body-md text-t-body-color" to="/signup">
                Don't have an account yet?
              </NavLink>
              &nbsp;
              <NavLink className="signup-link text-primary" to="/signup">
                SignUp
              </NavLink>
            </Col>
          </div>
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
