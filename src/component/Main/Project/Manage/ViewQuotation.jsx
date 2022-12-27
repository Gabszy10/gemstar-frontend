import React, { useRef } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table
} from 'react-bootstrap';
import ReactToPrint from 'react-to-print';

import logo from '../../../../assets/LandingPageImages/logo.png';
import LabelAndText from '../../../UI/LabelAndText';
import { dateFormatting, numberWithCommas } from './../../../Shared/Helpers/dateFormat';

const ViewQuotation = props => {
  const { handleClose, show, projectQuotation, services } = props;
  const ref = useRef();

  const sortQoutationServices = () => {
    const initialValue = {
      declared: [],
      undeclared: [],
      placeHolderbaba: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      totalAmount: 0
    };
    if (projectQuotation.services && projectQuotation.services.length > 0) {
      return projectQuotation.services.reduce((acc, cur) => {
        if (cur.services_id === 'others') {
          acc.placeHolderbaba.pop();
          return {
            ...acc,
            undeclared: [...acc.undeclared, cur],
            totalAmount: acc.totalAmount + cur.price
          };
        } else {
          return {
            ...acc,
            declared: [...acc.declared, cur],
            totalAmount: acc.totalAmount + cur.price
          };
        }
      }, initialValue);
    } else {
      return initialValue;
    }
  };

  const inputtedServices = sortQoutationServices();

  return (
    <>
      <Modal show={show} size="xl" onHide={handleClose} keyboard={false}>
        <Modal.Body>
          <div ref={ref}>
            <Container key="divToPrint">
              <div className="d-flex justify-content-start">
                <div className="ms-5">
                  <img className="h-100 w-75" src={logo} alt="logo" />
                </div>
                <div className="text-center">
                  <h5 className="mb-0 mt-2">GEMSTAR ENGINEERING SERVICES</h5>
                  <p className="mb-1">
                    MACHINE SHOP | METAL FABRICATION | ENGINE REBUILDER | AUTO
                    SHOP
                  </p>
                  <p className="mb-1">
                    C. Morales Bldg., Nat'l Hi-way, Canlalay, Biñan City, Laguna
                  </p>
                  <p className="mb-1">Contact No.: +63 927 850 3420</p>
                  <p className="mb-1">gemstar.machineshop@gmail.com</p>
                </div>
              </div>

              <hr />
              {Object.keys(projectQuotation).length > 0 ? (
                <>
                  <Row className="mb-3">
                    <Col md={8} xs={12}>
                      <Form.Group controlId="formGridCustomer">
                        <h4>QUOTATION</h4>
                        <br />
                        <LabelAndText
                          className="mb-2"
                          label="CUSTOMER: "
                          value={projectQuotation.customer}
                          isReadOnly={true}
                        />

                        <LabelAndText
                          className="mb-2"
                          label="ADDRESS: "
                          value={projectQuotation.address}
                          isReadOnly={true}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4} xs={12}>
                      <Form.Group controlId="formGridCompany">
                        <LabelAndText
                          className="mb-4"
                          label="DATE: "
                          value={dateFormatting(projectQuotation.date, 'mdy')}
                          isReadOnly={true}
                        />

                        <LabelAndText
                          className="mb-2"
                          label="ENGINE MODEL: "
                          value={projectQuotation.engine_model}
                          isReadOnly={true}
                        />

                        <LabelAndText
                          className="mb-2"
                          label="SERIAL NO. "
                          value={projectQuotation.serial_number}
                          isReadOnly={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {services.length > 0 ? (
                        <Table bordered hover>
                          <thead>
                            <tr className="text-center">
                              <th>QTY</th>
                              <th>UNIT</th>
                              <th>ENGINE RECONDITIONING SERVICES</th>
                              <th>UNIT PRICE</th>
                              <th>AMOUNT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {services &&
                              services.map((res, index) => {
                                const data = inputtedServices.declared.filter(
                                  ser => ser.services_name === res.services_name
                                );
                                const newData = data.length > 0 ? data[0] : res;
                                return (
                                  <tr
                                    key={`view-dec-${index}`}
                                    className="text-center">
                                    <td>{newData.quantity}</td>
                                    <td>{newData.unit}</td>
                                    <td className="text-start">
                                      {newData.services_name}
                                    </td>
                                    <td>{numberWithCommas(newData.unit_price)}</td>
                                    <td>{numberWithCommas(newData.price)}</td>
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
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {inputtedServices.undeclared.map((res, index) => {
                              return (
                                <tr
                                  key={`view-undec-${index}`}
                                  className="text-center">
                                  <td>{res.quantity}</td>
                                  <td>{res.unit}</td>
                                  <td className="text-start">
                                    {res.services_name}
                                  </td>
                                  <td>{numberWithCommas(res.unit_price)}</td>
                                  <td>{numberWithCommas(res.price)}</td>
                                </tr>
                              );
                            })}
                            {inputtedServices.placeHolderbaba.map(
                              (res, index) => {
                                return (
                                  <tr
                                    key={`view-pla-${index}`}
                                    className="text-center">
                                    <td className="p-3"></td>
                                    <td className="p-3"> </td>
                                    <td className="text-start p-3"></td>
                                    <td className="p-3"></td>
                                    <td className="p-3"></td>
                                  </tr>
                                );
                              }
                            )}
                            <tr>
                              <th colSpan={4} className="text-end">
                                TOTAL AMOUNT
                              </th>
                              <td className="text-center">
                                {numberWithCommas(projectQuotation.totalAmount) || 0}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      ) : (
                        'No Services'
                      )}
                    </Col>
                  </Row>
                </>
              ) : (
                ''
              )}
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCustomer">
                  <LabelAndText className="mb-2" label="Prepared by: " />
                  <LabelAndText className="mb-2" label="Approved by: " />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCompany">
                  <Form.Label>Conforme:</Form.Label>
                  <Form.Control
                    className="border-0 border-bottom"
                    type="text"
                  />
                  <p>
                    <center>Signature over printed name</center>
                  </p>
                </Form.Group>
              </Row>
            </Container>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <ReactToPrint
            trigger={() => <Button variant="primary">Print</Button>}
            content={() => ref.current}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewQuotation;
