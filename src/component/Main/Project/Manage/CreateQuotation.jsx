/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const CreateQuotation = (props) => {
  const {
    handleClose,
    show,
    createQuotationDetails,
    projectId,
    projectDetails,
  } = props;

  const [values, setValues] = useState({
    customer: "",
    address: "",
    engine_model: "",
    serial_number: "",
  });

  useEffect(() => {
    setValues({
      ...values,
      customer: `${projectDetails.last_name}, ${projectDetails.first_name}`,
      address: projectDetails.address,
    });
  }, [projectDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.customer === "" &&
      values.address === "" &&
      values.engine_model === "" &&
      values.serial_number === ""
    ) {
      toast.error("Error Notification !", {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      createQuotationDetails({ ...values, projectId }).then(() => {
        toast.success("Quotation Successfully Created!", {
          position: toast.POSITION.TOP_CENTER,
        });
        handleClose();
      });
    }
  };

  return (
    <>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Modal.Header closeButton>
            <Modal.Title>Create Quotation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2" controlId="formBasicFirstName">
              <Form.Label className="mb-0">Customer: </Form.Label>
              <Form.Control
                type="text"
                name="customer"
                placeholder="Enter Customer Name"
                value={values.customer}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicFirstName">
              <Form.Label className="mb-0">Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Address"
                value={values.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicFirstName">
              <Form.Label className="mb-0">Engine Model:</Form.Label>
              <Form.Control
                type="text"
                name="engine_model"
                placeholder="Enter Engine Model"
                value={values.engine_model}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicFirstName">
              <Form.Label className="mb-0">Serial Number:</Form.Label>
              <Form.Control
                type="text"
                name="serial_number"
                placeholder="Enter Serial Number"
                value={values.serial_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateQuotation;
