import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import UPFormControl from '../../components/UPFormControl/UPFormControl';
import { resetPasswordRequest } from '../../store/account/userActions';
import './ResetPassword.scss';

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

function ResetPassword ({...props}) {
  const {history,resetpassword} = props;
  const [state, setState] = useState({
    data: {
      password: '',
      resetToken: params.token,
    },
    errors: {},
  });
  

  const validate = () => {
    const { data } = state;
    const errors = {};
    if (data.password === '') errors.password = 'Password cannot be blank.';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { data } = state;
    const errors = validate();

    const payload = {
      password: data.password,
      resetToken: data.resetToken,
      history: history,
    }

    if (Object.keys(errors).length === 0) {
      resetpassword(payload);

      setState({
        data: {
          password: '',
          resetToken: params.token,
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
      <>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
              <UPFormControl
                label="Password"
                type="password"
                value={data.password}
                handleChange={handleChange}
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
const mapDispatchToProps = (dispatch) => {
  return {
    resetpassword: (creds) => {
      dispatch(resetPasswordRequest(creds));
    },
  };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
