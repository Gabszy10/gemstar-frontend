import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

const NotEditableField = props => {
  const { value, label } = props;

  return (
    <Row className="mb-3 px-2">
      <Col lg={4} md={5} sm={12}>
        <Form.Label className="title">{label}</Form.Label>
      </Col>
      <Col lg={8} md={7} sm={12} className="d-flex">
        <p className="mb-0 align-self-center">{value}</p>
      </Col>
    </Row>
  );
};

export default NotEditableField;
