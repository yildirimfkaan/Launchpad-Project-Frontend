/* eslint-disable max-len */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { forgotPasswordRequest } from '../../store/account/userActions';
import './ForgotPassoword.scss';
import { NavLink } from 'react-router-dom';

function ForgotPassword({ ...props }) {
  const { forgotpassword } = props;
  const [state, setState] = useState({
    data: {
      email: '',
    },
    errors: {},
  });
  const validate = () => {
    const { data } = state;
    const errors = {};
    if (data.username === '') errors.email = 'Email cannot be blank.';
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { data } = state;
    const errors = validate();

    if (Object.keys(errors).length === 0) {
      forgotpassword(data);

      setState({
        data: {
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
      <Col className="public-layout-col d-flex justify-content-center align-items-center bg-white px-1 py-2">
        <div className="public-layout-image d-md-flex d-none flex-column justify-content-center align-items-center bg-tertiary px-1 py-2">
          <div className="text-fs-head-lg text-center text-light px-2">
            Forgot password on the way of the future of{' '}
            <div className="text-primary">fundraising?</div>
          </div>
          <div className="text-fs-body-md text-center text-light px-2">
            Please enter the email adress you would lile to reset information sent to.
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center aling-items-center px-4 mx-2 public-layout-form">
          <Form onSubmit={handleSubmit}>
            <UPFormControl
              label="Email"
              type="text"
              value={data.email}
              handleChange={handleChange}
              error={errors.email}
            />
            <Button type="submit" className="mb-4 mt-4 bg-unopad-primary col-sm-12">
              Send Password Reset Email
            </Button>
          </Form>
          <NavLink className="d-flex justify-content-center m-0 text-primary" to="/login">
            Back to Login
          </NavLink>
        </div>
      </Col>
    </Row>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    forgotpassword: (creds) => {
      dispatch(forgotPasswordRequest(creds));
    },
  };
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
