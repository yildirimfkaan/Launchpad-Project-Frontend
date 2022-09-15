import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { activationRequest } from '../../store/account/userActions';
import './Activation.scss';

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

class Activation extends Component {
  state = {
    data: {
      activationCode: '',
      activationToken: params.token,
    },
    errors: {},
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (data.activationCode === '') errors.activationCode = 'Activation Code cannot be blank.';

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();

    const payload = {
      activationCode: data.activationCode,
      activationToken: data.activationToken,
      history: this.props.history,
    }

    if (Object.keys(errors).length === 0) {
      this.props.activation(payload);

      this.setState({
        data: {
          activationCode: '',
          activationToken: params.token,
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
        activationCode: e.target.value,
        
    },
      
      errors: {
        ...this.state.errors,
        activationCode: '',
      },
    });
    
};
 
  render() {
    const { data, errors } = this.state;
    console.log("data",data)
    console.log("asd")
    return (
      <>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
              <UPFormControl
                label="ActivationCode"
                type="password"
                value={data.activationCode}
                handleChange={this.handleChange}
                error={errors.activationCode}
              />

              <Button
                type="submit"
                style={{ backgroundColor: '#365ae1', marginTop: '10px', justifyContent: 'center' }}
              >
                Activate your Account
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
    activation: (creds) => {
      dispatch(activationRequest(creds));
    },
  };
};

export default connect(null, mapDispatchToProps)(Activation);
