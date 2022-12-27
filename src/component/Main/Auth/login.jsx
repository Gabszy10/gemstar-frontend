import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginUser, isAuthenticated } from '../../../store/action/index';
import { toast } from 'react-toastify';
import MaxWidthBody from '../../UI/MaxWidthBody';
import cookie from "js-cookie";

const Login = props => {
  const { loginUser } = props;

  useEffect(() => {
    let token = cookie.get("_wus_BJK");
    console.log(token, 'token');
    if (token) {
      window.location.href = "/";
    }
  }, []);

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginUser(values).then(ret => {
      if (ret.success) {
        toast.success('Login Succesfully!', {
          position: toast.POSITION.TOP_CENTER
        });
        window.location.href = "/";
      } else {
        toast.error(ret.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });
  };

  return (
    <MaxWidthBody style={{ maxWidth: '750px' }}>
      <Card.Title className="text-center mt-2">Log In</Card.Title>
      <hr className="m-0" />
      <Card.Body className="px-0">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="formBasicFirstName">
            <Form.Label className="mb-0">Username:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter your username"
              value={values.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label className="mb-0">Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* <Link
                  className="text-black text-decoration-none d-flex justify-content-center"
                  to={`/fpassword`}>
                  Forgot Password?
            </Link> */}

          <div className="d-grid gap-1 mt-3">
            <Button outline variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Card.Body>
    </MaxWidthBody>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.app.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isAuthenticated: () => dispatch(isAuthenticated()),
    loginUser: props => dispatch(loginUser(props))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
