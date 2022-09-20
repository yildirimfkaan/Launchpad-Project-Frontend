import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { activationRequest } from '../../store/account/userActions';
import './Activation.scss';

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
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            <UPFormControl
              label="ActivationCode"
              type="password"
              value={data.activationCode}
              handleChange={handleChange}
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
const mapDispatchToProps = (dispatch) => {
  return {
    activation: (creds) => {
      dispatch(activationRequest(creds));
    },
  };
};

export default connect(null, mapDispatchToProps)(Activation);
