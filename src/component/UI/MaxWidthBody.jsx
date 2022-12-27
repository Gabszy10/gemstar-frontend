import React from 'react';
import { Card, Container } from 'react-bootstrap';
import './index.css';

const MaxWidthBody = props => {
  const { className, children } = props;
  return (
    <Container style={{ maxWidth: '500px' }} className={`my-5 ${className}`}>
      <Card className="shadow bg-light rounded p-3 w-100 bodyWrapper">
        {children}
      </Card>
    </Container>
  );
};

export default MaxWidthBody;
