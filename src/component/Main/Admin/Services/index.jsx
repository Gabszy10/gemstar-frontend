import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addServices, fetchServices } from '../../../../store/action';

const ServicesUpdate = props => {
  const { addServices, fetchServices, services } = props;

  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    service_type: '',
    price: 0
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    addServices(values).then(ret => {
      setShow(false);
      setValues({
        service_type: '',
        price: 0
      });
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}>
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
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="0.00"
                value={values.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div class="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={() => setShow(true)}>
          Add Services
        </Button>
      </div>

      <Table striped bordered responsive hover>
        <thead>
          <tr>
            {/*<th>ID</th> */}
            <th>SERVICE NAME</th>
            <th>PRICE</th>
            <th>ADDED BY</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(services).length > 0
            ? services.map(ret => {
                return (
                  <tr>
                    {/*<th>{ret.services_id}</th> */}
                    <td>{ret.services_name}</td>
                    <td>{ret.services_price}</td>
                    <td>{`${ret.first_name} ${ret.last_name}`}</td>
                  </tr>
                );
              })
            : ''}
        </tbody>
      </Table>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.app.isAuthenticated,
    services: state.services
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addServices: props => dispatch(addServices(props)),
    fetchServices: () => dispatch(fetchServices())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesUpdate);
