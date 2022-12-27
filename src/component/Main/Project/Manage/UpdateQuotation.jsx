/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Modal,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Popover,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { numberWithCommas } from "../../../Shared/Helpers/dateFormat";

const defaultId = {
  project_qoutation_id: "",
  project_qoutation_detail_id: "",
  quantity: 0,
  unit: "pcs",
  services_name: "",
  unit_price: 0,
  price: 0,
};

const UpdateQuotation = (props) => {
  const {
    handleClose,
    show,
    createQuotationServices,
    services,
    projectId,
    projectQuotation,
    showQuotationToClient,
  } = props;

  const [values, setValues] = useState({
    quantity: "",
    unit: "pcs",
    services_id: "",
    services_name: "",
    unit_price: "",
    price: 0,
  });
  const [toUpdate, setToUpdate] = useState(defaultId);

  const sortQoutationServices = () => {
    const initialValue = {
      declared: [],
      undeclared: [],
      placeHolderbaba: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    if (projectQuotation.services && projectQuotation.services.length > 0) {
      return projectQuotation.services.reduce((acc, cur) => {
        if (cur.services_id === "others") {
          acc.placeHolderbaba.pop();
          return { ...acc, undeclared: [...acc.undeclared, cur] };
        } else {
          return { ...acc, declared: [...acc.declared, cur] };
        }
      }, initialValue);
    } else {
      return initialValue;
    }
  };

  const [inputtedServices, setInputtedServices] = useState(
    sortQoutationServices()
  );
  useEffect(() => {
    setInputtedServices(sortQoutationServices());
  }, [projectQuotation.services]);

  useEffect(() => {
    setValues({ ...values, price: values.quantity * values.unit_price });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.quantity, values.unit_price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    if (value === "others") {
      setValues({
        ...values,
        services_id: value,
        services_name: "",
      });
    } else {
      const newVal = value.split("+++");
      setValues({
        ...values,
        services_id: newVal[0],
        services_name: newVal[1],
      });
    }
  };

  const handleShowClient = () => {
    showQuotationToClient({
      projectId,
      project_qoutation_detail_id: projectQuotation.project_qoutation_detail_id,
    }).then(() => {
      toast.success("Quotation Done!", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.quantity === "" ||
      values.quantity === 0 ||
      values.unit === "" ||
      values.services_id === "" ||
      values.services_name === "" ||
      values.unit_price === "" ||
      values.unit_price === 0
    ) {
      toast.error("Please complete necessary details !", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      createQuotationServices({
        ...values,
        project_qoutation_detail_id:
          projectQuotation.project_qoutation_detail_id,
      }).then((res) => {
        if (res.success) {
          toast.success("Services added Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    }
  };

  return (
    <>
      <Modal
        show={show}
        size="xl"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quotation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Row>
                <Form.Group
                  as={Col}
                  className="mb-2 col-12 col-md-6"
                  controlId="formBasicFirstName"
                >
                  <Form.Label className="mb-0">Quantity: </Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Enter Quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-2 col-12 col-md-6"
                  controlId="formBasicFirstName"
                >
                  <Form.Label className="mb-0">Unit:</Form.Label>
                  <Form.Control
                    type="text"
                    name="unit"
                    placeholder="Enter Unit"
                    value={values.unit}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  className={`mb-2 ${
                    values.services_id === "others"
                      ? "col-12 col-md-6"
                      : "col-12"
                  }`}
                  controlId="formBasicFirstName"
                >
                  <Form.Label className="mb-0">Services: </Form.Label>
                  <Form.Select
                    defaultValue="0"
                    onChange={handleSelectChange}
                    required
                  >
                    <option key={`opt-0`} value="0" disabled>
                      Select Services
                    </option>
                    {services.length > 0
                      ? services.map((res) => {
                          return (
                            <option
                              key={`opt-${res.services_id}`}
                              value={`${res.services_id}+++${res.services_name}`}
                            >
                              {res.services_name}
                            </option>
                          );
                        })
                      : ""}
                    <option value="others">others</option>
                  </Form.Select>
                </Form.Group>

                {values.services_id === "others" ? (
                  <Form.Group
                    as={Col}
                    className="mb-2 col-12 col-md-6"
                    controlId="formBasicFirstName"
                  >
                    <Form.Label className="mb-0">
                      Enter other service:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="services_name"
                      placeholder="Enter other service"
                      value={values.services_name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                ) : (
                  ""
                )}

                <Form.Group
                  as={Col}
                  className="mb-2 col-12 col-md-6"
                  controlId="formBasicFirstName"
                >
                  <Form.Label className="mb-0">Unit Price:</Form.Label>
                  <Form.Control
                    type="number"
                    name="unit_price"
                    placeholder="Enter Unit Price"
                    value={values.unit_price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-2 col-12 col-md-6"
                  controlId="formBasicFirstName"
                >
                  <Form.Label className="mb-0">Amount:</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    value={values.price}
                    readOnly
                  />
                </Form.Group>
              </Row>

              <Row className="">
                <Col>
                  <Button variant="primary" type="submit">
                    Add Services
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row className="mt-3">
              <Col>
                {projectQuotation.services &&
                projectQuotation.services.length > 0 ? (
                  <Table bordered hover>
                    <thead>
                      <tr className="text-center">
                        <th>QTY</th>
                        <th>UNIT</th>
                        <th>ENGINE RECONDITIONING SERVICES</th>
                        <th>UNIT PRICE</th>
                        <th>AMOUNT</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputtedServices.declared.map((res, index) => {
                        return (
                          <tr key={`upt-dec-${index}`} className="text-center">
                            <td>{res.quantity}</td>
                            <td>{res.unit}</td>
                            <td className="text-start">{res.services_name}</td>
                            <td>{numberWithCommas(res.unit_price)}</td>
                            <td>{numberWithCommas(res.price)}</td>
                            <td>
                              <OverlayTrigger
                                trigger="click"
                                placement="right"
                                overlay={
                                  <Popover id="popover-basic">
                                    <Popover.Body>
                                      And here's some <strong>amazing</strong>{" "}
                                      content. It's very engaging. right?
                                    </Popover.Body>
                                  </Popover>
                                }
                              >
                                <i className="fas fa-ellipsis-v" />
                              </OverlayTrigger>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <thead>
                      <tr className="text-center">
                        <th>QTY</th>
                        <th>UNIT</th>
                        <th>
                          LATHE-MILLING, SPECIAL MACHINING, FABRICATION,
                          MAINTENANCE SERVICES
                        </th>
                        <th>SUB-TOTAL</th>
                        <th>AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputtedServices.undeclared.map((res, index) => {
                        return (
                          <tr
                            key={`upt-undec-${index}`}
                            className="text-center"
                          >
                            <td>{res.quantity}</td>
                            <td>{res.unit}</td>
                            <td className="text-start">{res.services_name}</td>
                            <td>{numberWithCommas(res.unit_price)}</td>
                            <td>{numberWithCommas(res.price)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  "No Services"
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {projectQuotation && projectQuotation.is_show === 1 ? (
            <div className="border py-2 px-3">Quotation shown</div>
          ) : (
            <Button variant="primary" onClick={handleShowClient}>
              Show Client
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateQuotation;
