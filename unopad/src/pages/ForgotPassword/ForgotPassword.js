import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { forgotPasswordRequest } from '../../store/account/userActions';
import './ForgotPassoword.scss';

function ForgotPassword ({...props}) {
  const {forgotpassword} = props;
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
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <UPFormControl
              label="Email"
              type="text"
              value={data.email}
              handleChange={handleChange}
              error={errors.email}
            />
            <Button
              type="submit"
              style={{
                backgroundColor: '#365ae1',
                display: 'flex',
                margin: 'auto',
                marginTop: '10px',
                justifyContent: 'center',
              }}
            >
              Reset Password
            </Button>
          </Form>
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
