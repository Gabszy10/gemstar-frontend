import React, { useState,useEffect, useRef } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';

const EditableInput = props => {
  const { value, label, handleSave, fieldName, elementId,type } = props;
  console.log("ElemetId",elementId);
  const [isEdit, setIsEdit] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const [isVisible, setIsVisible] = useState(true);

  const handleChange = e => {
    const { value } = e.target;
    setNewValue(value);
  };


  return (
    <Row className="mb-3 px-2">
      <Col lg={4} md={5} sm={12}>
        <Form.Label className="title">{label}</Form.Label>
      </Col>
      <Col lg={8} md={7} sm={12} className="d-flex">
        {isEdit ? (
          <>
            <Form.Group className="flex-grow-1" controlId="formBasicEmail">
              <Form.Control
                type={type}
                value={newValue}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              className="text-white ms-2"
              onClick={() => {
                setIsEdit(false);
                handleSave(elementId, fieldName, newValue);
              }}>
              Save
            </Button>
            <Button
              className="text-white ms-2"
              variant="cancel"
              onClick={() => {
                setIsEdit(false);
                setNewValue(value);
              }}>
              Cancel
            </Button>
          </>
        ) : (
          <React.Fragment>
            <p className="mb-0 align-self-center">{newValue}</p>
            <Button
              className={isVisible ? '' : 'invisible'}
              variant="link"
              onClick={() => {
                setIsEdit(true);
              }}>
              Edit
            </Button>
          </React.Fragment>
        )}
      </Col>
    </Row>
  );
};

export default EditableInput;
