/* eslint-disable max-len */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { signUpRequest } from '../../store/account/userActions';
import { NavLink } from 'react-router-dom';
import './SignUp.scss';
import unopadLogo from '../../assets/img/logo/unopad-logo-white.png';

function SignUp({ ...props }) {
  const { sign, history } = props;
  const [state, setState] = useState({
    data: {
      username: '',
      password: '',
      email: '',
    },
    errors: {},
  });

  const validate = () => {
    const { data } = state;
    const errors = {};

    if (data.username === '') errors.username = 'Username cannot be blank.';
    if (data.password === '') errors.password = 'Password cannot be blank.';
    if (data.email === '') errors.email = 'Email cannot be blank.';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { data } = state;
    const errors = validate();

    const payload = {
      data,
      history: history,
    };

    if (Object.keys(errors).length === 0) {
      sign(payload);

      setState({
        data: {
          username: '',
          password: '',
          email: '',
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
      <Col className="public-signup-layout-col d-flex justify-content-center align-items-center bg-white px-1 py-2">
        <div className="public-signup-layout-image d-md-flex d-none flex-column justify-content-center align-items-center bg-tertiary px-1 py-2">
          <div className="text-fs-head-lg text-center text-light px-2">
            Welcome to the future of <div className="text-primary">fundraising</div>
          </div>
          <div className="text-fs-body-md text-center text-light px-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua
          </div>
          <img src={unopadLogo} alt="Logo" heigth={83} width={116} className="mt-4" />
        </div>
        <div className="d-flex flex-column justify-content-center aling-items-center px-4 mx-2 public-signup-layout-form">
          <Form onSubmit={handleSubmit}>
            <UPFormControl
              label="Name/Surname"
              type="text"
              value={data.username}
              handleChange={handleChange}
              error={errors.username}
            />
            <UPFormControl
              label="Email"
              type="text"
              value={data.email}
              handleChange={handleChange}
              error={errors.email}
            />
            <UPFormControl
              label="Password"
              type="password"
              value={data.password}
              handleChange={handleChange}
              error={errors.password}
            />
            <Button className="mb-4 mt-4 bg-unopad-primary col-sm-12" type="submit">
              SignUp
            </Button>
          </Form>
          {/* <NavLink className="d-flex justify-content-center m-0 text-primary" to="/forgotpassword">
            Forgot Password?
          </NavLink> */}

          <Col className="m-1 d-flex justify-content-center">
            <NavLink
              className="text-fs-body-md text-t-body-color justify-content-center"
              to="/signup"
            >
              Do you have an account?
            </NavLink>

            <NavLink className="text-primary p-1" to="/login">
              Login
            </NavLink>
          </Col>
        </div>
        {/* <Button color="primary" onClick={this.handleSign}>SignUp</Button> */}
      </Col>
    </Row>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    sign: (creds) => {
      dispatch(signUpRequest(creds));
    },
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
