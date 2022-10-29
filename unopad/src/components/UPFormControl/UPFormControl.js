/* eslint-disable max-len */
import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import './UPFormControl.scss';

const FormControl = (props) => {
  const { label, type, error, handleChange, value } = props;
  const name = label.toLowerCase();

  return (
    <FormGroup>
      <Form.Label className="mt-2 text-fs-body-lg text-t-head-color" for={name}>
        {label}
      </Form.Label>
      <Form.Control type={type} id={name} invalid={!!error} onChange={handleChange} value={value} />
      {/*  <FormFeedback>{error}</FormFeedback> */}
    </FormGroup>
  );
};

export default FormControl;
