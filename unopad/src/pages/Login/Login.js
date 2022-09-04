import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { loginRequest, signUpRequest } from '../../store/account/userActions';
import { NavLink } from 'react-router-dom';
import './Login.scss';

class Login extends Component {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {},
  };
  validate = () => {
    const { data } = this.state;
    const errors = {};

    if (data.username === '') errors.username = 'Username cannot be blank.';
    if (data.password === '') errors.password = 'Password cannot be blank.';

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();
    const payload = {
      data,
      history: this.props.history,
    }
    if (Object.keys(errors).length === 0) {
      this.props.login(payload);

      this.setState({
        data: {
          username: '',
          password: '',
        },
        errors: {},
      });
    } else {
      this.setState({
        errors,
      });
    }
  };
  handleChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.id]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.id]: '',
      },
    });
  };
  render() {
    const { data, errors } = this.state;

    return (
      <Row>
        <Col>
          <Form id="loginForm" onSubmit={this.handleSubmit}>
            <UPFormControl
              label="Username"
              type="text"
              value={data.username}
              handleChange={this.handleChange}
              error={errors.username}
            />
            <UPFormControl
              label="Password"
              type="password"
              value={data.password}
              handleChange={this.handleChange}
              error={errors.password}
            />
          </Form>
          <div style={{ textAlign: 'center' }}>
            <Button
              form="loginForm"
              type="submit"
              style={{ backgroundColor: '#365ae1', marginTop: '10px' }}
            >
              Login
            </Button>

            <Button
              type="button"
              onClick={(event) => (this.props.history.push('/signup'))}
              style={{ backgroundColor: '#365ae1', marginLeft: '10px', marginTop: '10px' }}
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
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (creds) => {
      dispatch(loginRequest(creds));
    },
    sign: () => {
      dispatch(signUpRequest());
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
