import React, { useState } from 'react';
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { createProject } from './../../../../store/action';
import { dateToEpoch } from '../../../Shared/Helpers/dateFormat';
import RichTextBox from '../../../UI/RichTextBox';

const CreateModule = props => {
  const { createProject } = props;
  const [errorCreate, setErrorCreate] = useState({
    status: false,
    message: ''
  });

  const [values, setValues] = useState({
    project_name: '',
    project_description: '',
    start_date: '',
    end_date: ''
  });

  const [file, setFile] = useState();

  const handleFileUpload = e => {
    const files = e.target.files;
    setFile(files);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    const newValues = {
      ...values,
      start_date: dateToEpoch(values.start_date),
      end_date: dateToEpoch(values.end_date)
    };
    for (let val in newValues) {
      formData.append(val, newValues[val]);
    }

    for (let i = 0; i < file.length; i++) {
      formData.append('file', file[i]);
    }

    createProject(formData).then(ret => {
      if (ret) {
        setErrorCreate({
          ...errorCreate,
          status: false
        });
        toast.success('Project Created!', {
          position: toast.POSITION.TOP_CENTER
        });
        props.history.push('/projects');
      }
    });
  };

  return (
    <Container className="my-5">
      <Card className="shadow bg-light rounded p-3 w-100">
        <Card.Title className="text-center mt-2">
          PROJECT INFORMATION
        </Card.Title>
        <hr className="mb-4 mt-0" />

        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-2" controlId="formBasicFirstName">
            <Form.Label className="mb-0">Project Name:</Form.Label>
            <Form.Control
              type="text"
              name="project_name"
              placeholder="Enter Project Name"
              value={values.project_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="mb-0">Description:</Form.Label>
            <RichTextBox
              name="project_description"
              values={values}
              setValues={setValues}
            />
          </Form.Group>

          <Row>
            <Form.Group className="mb-3" as={Col} controlId="formGridDate">
              <Form.Label className="mb-0">Start Date:</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                placeholder="Enter start date"
                value={values.start_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="formGridDeadline">
              <Form.Label className="mb-0">Deadline:</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={values.end_date}
                onChange={handleChange}
                placeholder="Enter Deadline"
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Attach File:</Form.Label>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Control
                type="file"
                name="file"
                value={values.files}
                onChange={handleFileUpload}
                multiple
              />
            </Form.Group>
          </Form.Group>

          <div className="d-flex flex-row-reverse bd-highlight">
            <Button className="px-2" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: props => dispatch(createProject(props))
  };
};

export default connect(null, mapDispatchToProps)(CreateModule);
