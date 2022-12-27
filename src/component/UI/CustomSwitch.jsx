import React, { useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';

const EditableInput = props => {
  const { value, label, handleSave, fieldName, elementId } = props;
  const [newValue, setNewValue] = useState(value);
  const [checked, setChecked] = useState(value === 1);
  const [isVisible, setIsVisible] = useState(true);

  const handleChange = e => {
    const { checked } = e.target;
    console.log(checked);
    setNewValue(checked ? 1 : 0);
    setChecked(checked);
  };

  return (
    <Row className="mb-3 px-2">
      <Col lg={4} md={5} sm={12}>
        <Form.Label className="title">{label}</Form.Label>
      </Col>
      <Col lg={8} md={7} sm={12} className="d-flex">
        <Form>
          <Form.Check
            disabled={value === 1}
            type="switch"
            id="custom-switch"
            checked={checked}
            onChange={handleChange}
          />
        </Form>
        {value === newValue ? (
          ''
        ) : (
          <Button
            className="text-white ms-2"
            onClick={() => {
              handleSave(elementId, fieldName, newValue);
            }}>
            Save
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default EditableInput;
