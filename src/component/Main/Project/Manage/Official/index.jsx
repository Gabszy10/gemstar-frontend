import React, { useRef } from "react";
import { Button, Row, Container, Modal } from "react-bootstrap";
import ReactToPrint from "react-to-print";

import RightForms from "./RightForms";

const Official = (props) => {
  const { handleClose, show, projectQuotation,projectDetails, services } = props;
  const ref = useRef();

  return (
    <Modal show={show} size="xl" onHide={handleClose} keyboard={false}>
      <Modal.Body>
        <div ref={ref}>
          <Container>
            <Row>
              <RightForms 
                projectQuotation={projectQuotation} 
                services={services}
                projectDetails={projectDetails}
              />
            </Row>
            <Row>
              <p className="mt-4">
                <center>
                  THIS RECEIPT SHALL BE VALID FOR FIVE (5) YEARS FROM THE DATE
                  OF ATP
                </center>
              </p>
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
  );
};
export default Official;
