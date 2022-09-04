import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { signUpRequest } from '../../store/account/userActions';
import './SignUp.scss';

class SignUp extends Component {
  state = {
    data: {
      username: '',
      password: '',
      email: '',
    },
    errors: {},
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};

    if (data.username === '') errors.username = 'Username cannot be blank.';
    if (data.password === '') errors.password = 'Password cannot be blank.';
    if (data.email === '') errors.email = 'Email cannot be blank.';
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
      this.props.sign(payload);

      this.setState({
        data: {
          username: '',
          password: '',
          email: '',
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
          <Form onSubmit={this.handleSubmit}>
            <UPFormControl
              label="Username"
              type="text"
              value={data.username}
              handleChange={this.handleChange}
              error={errors.username}
            />
            <UPFormControl
              label="Email"
              type="text"
              value={data.email}
              handleChange={this.handleChange}
              error={errors.email}
            />
            <UPFormControl
              label="Password"
              type="password"
              value={data.password}
              handleChange={this.handleChange}
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    sign: (creds) => {
      dispatch(signUpRequest(creds));
    },
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
