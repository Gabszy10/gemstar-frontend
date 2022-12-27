import React from 'react';
import { Container } from 'react-bootstrap';
import './index.css';

const FooterComponent = () => {
  return (
    <div className="footer-background">
      <Container className="text-white text-center">
        &copy; {new Date().getFullYear()} Copyright: All Rights Reserved.
        <p className="mb-0">
          <a className="text-white text-decoration-none" href="#!">
            Privacy Policy
          </a>{' '}
          &
          <a className="text-white text-decoration-none" href="#!">
            {' '}
            Terms
          </a>
        </p>
      </Container>
    </div>
  );
};

export default FooterComponent;
