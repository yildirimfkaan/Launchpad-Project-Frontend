/* eslint-disable max-len */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Button, Row } from 'react-bootstrap';
// import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { loginRequest } from '../../store/account/userActions';
import { NavLink } from 'react-router-dom';
import './Login.scss';
// import loginBg from '../../assets/img/background/login-background-img.png';

function Login({ ...props }) {
  const { login } = props;
  const [state, setState] = useState({
    data: {
      username: '',
      password: '',
    },
    errors: {},
  });

  const validate = () => {
    const { data } = state;
    const errors = {};

    if (data.username === '') errors.username = 'Username cannot be blank.';
    if (data.password === '') errors.password = 'Password cannot be blank.';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { data } = state;
    const errors = validate();
    const payload = {
      data,
      history: props.history,
    };
    if (Object.keys(errors).length === 0) {
      login(payload);

      setState({
        data: {
          username: '',
          password: '',
        },
        errors: {},
      });
    } else {
      setState({
        errors,
      });
    }
  };
  const handleChange = (e) => {
    setState({
      data: {
        ...state.data,
        [e.target.id]: e.target.value,
      },
      errors: {
        ...state.errors,
        [e.target.id]: '',
      },
    });
  };

  const { data, errors } = state;

  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col className="public-layout-col d-flex justify-content-center align-items-center bg-white px-1 py-2">
        <div className="public-layout-image d-md-flex d-none flex-column justify-content-center align-items-center bg-tertiary px-1 py-2">
          <div className="text-fs-head-lg text-center text-light px-2">
            Welcome to the future of <div className="text-primary">fundraising</div>
          </div>
          <div className="text-fs-body-md text-center text-light px-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center aling-items-center px-4 mx-2 public-layout-form">
          <Form id="loginForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="username"
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={data.username}
                error={errors.username}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={data.password}
                error={errors.password}
              />
            </Form.Group>
            <Button
              className="mb-4 mt-4 bg-unopad-primary col-sm-12"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>

          <NavLink
            className="forgotpassword-link d-flex justify-content-center m-2 text-primary"
            to="/forgotpassword"
          >
            Forgot Password?
          </NavLink>

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
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (creds) => {
      dispatch(loginRequest(creds));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
