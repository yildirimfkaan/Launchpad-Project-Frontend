import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import FormControl from '../components/FormControl.jsx';
import { forgotPasswordRequest } from '../store/account/userActions';
class ForgotPassword extends Component {
  state = {
    data: {
      email: '',
    },
    errors: {},
  };
  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (data.username === '') errors.email = 'Email cannot be blank.';
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();
    
    if (Object.keys(errors).length === 0) {
      this.props.forgotpassword(data);

      this.setState({
        data: {
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
            <FormControl
              label="Email"
              type="text"
              value={data.email}
              handleChange={this.handleChange}
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
}
const mapDispatchToProps = (dispatch) => {
  return {
    forgotpassword: (creds) => {
      dispatch(forgotPasswordRequest(creds));
    },
  };
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
