import React from 'react';
import { Form } from 'react-bootstrap';

const LabelAndText = props => {
  const { value, label, className, isReadOnly } = props;
  return (
    <Form.Group className={`d-flex ${className}`} controlId="formGridCompany">
      <Form.Label className="text-nowrap m-0 align-self-center">
        {label}
      </Form.Label>
      <Form.Control
        readOnly={!!isReadOnly}
        className="ms-2 flex-grow-1 border-0 border-bottom bg-transparent"
        value={value}
        type="text"
      />
    </Form.Group>
  );
};

export default LabelAndText;
