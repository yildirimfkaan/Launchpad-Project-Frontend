import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { loginRequest} from '../../store/account/userActions';
import { NavLink } from 'react-router-dom';
import './Login.scss';


function Login({ ...props }) {
  const {login} = props;
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
    <Row>
      <Col>
        <Form id="loginForm" onSubmit={handleSubmit}>
          <UPFormControl
            label="Username"
            type="text"
            value={data.username}
            handleChange={handleChange}
            error={errors.username}
          />
          <UPFormControl
            label="Password"
            type="password"
            value={data.password}
            handleChange={handleChange}
            error={errors.password}
          />
        </Form>
        <div className='mt-2' style={{ textAlign: 'center' }}>
          <Button
          className='me-2'
            form="loginForm"
            type="submit"
          >
            Login
          </Button>

          <Button
            type="button"
            onClick={(event) => props.history.push('/signup')}
          >
            SignUp
          </Button>
        </div>
        <NavLink
          className="navbar-brand"
          to="/forgotpassword"
          style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
        >
          Forgot Password?
        </NavLink>
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
