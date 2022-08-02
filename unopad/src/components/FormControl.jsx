import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';

const FormControl = (props) => {
  const { label, type, error, handleChange, value } = props;
  const name = label.toLowerCase();

  return (
    <FormGroup>
      <Form.Label for={name} style={{ marginTop: '10px' }}>
        {label}
      </Form.Label>
      <Form.Control type={type} id={name} invalid={!!error} onChange={handleChange} value={value} />
      {/*  <FormFeedback>{error}</FormFeedback> */}
    </FormGroup>
  );
};

export default FormControl;
