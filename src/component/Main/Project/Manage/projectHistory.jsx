import React, { Fragment, useState } from "react";
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline'
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import RichTextBox from "../../../UI/RichTextBox";
import { projectHistoryDate } from './../../../Shared/Helpers/dateFormat';

const ProjectHistory = (props) => {
  const { user_level_acc, createProjectStatus, projectId, projectStatus } =
    props;
  const [values, setValues] = useState({
    statusId: 3,
    remarks: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectStatus.length >= 1) {
      if (window.confirm('Are you sure you are done with the other process?')) {
        // Save it!
        createProjectStatus(projectId, values.statusId, values.remarks);
      }
    } else {
      createProjectStatus(projectId, values.statusId, values.remarks);
    }
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setValues({ ...values, statusId: value });
  };

  return (
    <Fragment>
      {user_level_acc === "emp" && (
        <Fragment>
          <Card.Title className="mt-4 px-2 pb-2 border-bottom">
            Tracking Details
          </Card.Title>
          <Row className="mx-2">
            <Col>
              <Form.Group
                as={Col}
                className="mb-2"
                controlId="formBasicFirstName"
              >
                <Form.Label className="mb-0">Add Employee: </Form.Label>
                <Form.Select
                  defaultValue={values.statusId}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="3">In Progress</option>
                  <option value="4">Done</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mx-2">
            <Col>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="my-2" controlId="formBasicPassword">
                  <RichTextBox
                    name="remarks"
                    values={values}
                    setValues={setValues}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  <i className="fas fa-paper-plane" />
                </Button>
              </Form>
            </Col>
          </Row>
        </Fragment>
      )}
      {console.log(projectStatus)}
      <Row className="my-3">
        <Col>
          <Timeline minEvents={projectStatus.length} placeholder>
            {[...projectStatus].reverse().map((res, i) => {
              return (
                <TimelineEvent
                  key={i}
                  
                  color={res.status_name.toLowerCase().includes('in progress') ? '#d4b608' : '#218838'}
                  title={<>
                    <h5
                      style={{ marginTop: '10px', fontSize: '15px' }}
                      dangerouslySetInnerHTML={{
                        __html: res.remarks,
                      }}
                    />
                    <hr style={{marginTop:'-10px'}}/>
                    <h6
                      style={{ marginTop: '-10px', fontSize: '15px' }}
                      dangerouslySetInnerHTML={{
                        __html: res.status_name,
                      }}
                    />
                  </>}
                  subtitle={projectHistoryDate(res.date_created, "mdy", `${res.first_name} ${res.last_name}`)}
                />
              );
            })}

            {/* <TimelineEvent
              color='#9c2919'
              title='Erro'
              subtitle='26/03/2019 09:51'
              action={{
                label: 'Ver detalhes...',
                onClick: () => window.alert('Erro!')
              }}
            />
            <TimelineEvent
              color='#9c2919'
              title='Erro'
              subtitle='26/03/2019 09:51'
              action={{
                label: 'Ver detalhes...',
                onClick: () => window.alert('Erro!')
              }}
            /> */}
          </Timeline>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectHistory;
