import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const CustomModal = props => {
  const {show, setShow} = props
  
  return (
    <>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Services</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Service Type</Form.Label>
              <Form.Control
                type="text"
                name="service_type"
                placeholder="Enter Service Type"
                value={values.service_type}
                onChange={handleChange}
                required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="0.00"
                value={values.price}
                onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default CustomModal;