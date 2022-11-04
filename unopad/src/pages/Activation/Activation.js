/* eslint-disable max-len */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { activationRequest } from '../../store/account/userActions';
import './Activation.scss';
import { NavLink } from 'react-router-dom';

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

function Activation({ ...props }) {
  const { history, activation } = props;
  const [state, setState] = useState({
    data: {
      activationCode: '',
      activationToken: params.token,
    },
    errors: {},
  });
  const validate = () => {
    const { data } = state;
    const errors = {};
    if (data.activationCode === '') errors.activationCode = 'Activation Code cannot be blank.';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { data } = state;
    const errors = validate();

    const payload = {
      activationCode: data.activationCode,
      activationToken: data.activationToken,
      history: history,
    };

    if (Object.keys(errors).length === 0) {
      activation(payload);

      setState({
        data: {
          activationCode: '',
          activationToken: params.token,
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
        activationCode: e.target.value,
      },

      errors: {
        ...state.errors,
        activationCode: '',
      },
    });
  };
  const { data, errors } = state;
  return (
    <>
    <Row className="d-flex justify-content-center align-items-center">
      <Col className="public-activation-layout-col d-flex justify-content-center align-items-center bg-white px-1 py-2">
        <div className="public-activation-layout-image d-md-flex d-none flex-column justify-content-center align-items-center bg-tertiary px-1 py-2">
          <div className="text-fs-head-lg text-center text-light px-2">
            Welcome to the future of <div className="text-primary">fundraising</div>
          </div>
          <div className="text-fs-body-md text-center text-light px-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center aling-items-center px-4 mx-2 public-activation-layout-form">
          <Form onSubmit={handleSubmit}>
            <UPFormControl
              label="Activation Code"
              type="password"
              value={data.activationCode}
              handleChange={handleChange}
              error={errors.activationCode}
            />
            <Button
              className="mb-4 mt-4 bg-unopad-primary col-sm-12"
              type="submit"
            >
              Activate your account
            </Button>
          </Form>
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
    activation: (creds) => {
      dispatch(activationRequest(creds));
    },
  };
};

export default connect(null, mapDispatchToProps)(Activation);
