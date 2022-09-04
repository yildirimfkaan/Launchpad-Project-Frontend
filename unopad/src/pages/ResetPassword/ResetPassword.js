import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { resetPasswordRequest } from '../../store/account/userActions';
import './ResetPassword.scss';

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

class ResetPassword extends Component {
  state = {
    data: {
      password: '',
      resetToken: params.token,
    },
    errors: {},
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (data.password === '') errors.password = 'Password cannot be blank.';

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();

    const payload = {
      password: data.password,
      resetToken: data.resetToken,
      history: this.props.history,
    }

    if (Object.keys(errors).length === 0) {
      this.props.resetpassword(payload);

      this.setState({
        data: {
          password: '',
          resetToken: params.token,
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
      <>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
              <UPFormControl
                label="Password"
                type="password"
                value={data.password}
                handleChange={this.handleChange}
                error={errors.password}
              />

              <Button
                type="submit"
                style={{ backgroundColor: '#365ae1', marginTop: '10px', justifyContent: 'center' }}
              >
                Reset Password
              </Button>
            </Form>
            {/* <Button color="primary" onClick={this.handleSign}>SignUp</Button> */}
          </Col>
        </Row>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    resetpassword: (creds) => {
      dispatch(resetPasswordRequest(creds));
    },
  };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
