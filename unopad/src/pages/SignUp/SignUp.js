import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { signUpRequest } from '../../store/account/userActions';
import './SignUp.scss';

function SignUp ({...props}){
  const {sign,history} = props;
  const [state, setState] = useState({
    data: {
      username: '',
      password: '',
      email:'',
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
    }

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
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <UPFormControl
              label="Username"
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
              SignUp
            </Button>
          </Form>
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
