import React, { useState } from 'react';
import { Button, Container, Form, Card } from 'react-bootstrap';
import MainBody from '../../UI/MainBody';

const ForgotPassword = props => {
  const [values, setValues] = useState({
    password: '',
    retypePassword: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  return (
    <MainBody className="w-50">
      <Card.Title className="text-center mt-2">Change Password</Card.Title>
      <hr className="m-0" />
      <Card.Body className="px-0">
        <Form>
          <Form.Group className="mb-2" controlId="formBasicFirstName">
            <Form.Label className="mb-0">New Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your username"
              value={values.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label className="mb-0">Re-type New Password:</Form.Label>
            <Form.Control
              type="password"
              name="retypePassword"
              placeholder="Enter your password"
              value={values.retypePassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-grid gap-1 mt-3">
            <Button outline variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </MainBody>
  );
};

export default ForgotPassword;
