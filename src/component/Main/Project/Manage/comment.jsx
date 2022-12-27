import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import RichTextBox from '../../../UI/RichTextBox';

const Comment = props => {
  const { createProjectComment, projectId, projectComments } = props;

  const [values, setValues] = useState({
    comment_content: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    createProjectComment({
      projectId,
      comment_content: values.comment_content.replace(
        /<p>/g,
        `<p class="mb-0">`
      )
    }).then(ret => {
      setValues({ ...values, comment_content: '' });
    });
  };

  return (
    <>
      <ListGroup className="d-flex bd-highlight mt-3">
        {projectComments.length > 0
          ? projectComments.map(res => {
              return (
                <ListGroup.Item
                  className="d-flex bd-highlight"
                  key={`${res.comment_id}`}>
                  <div className="me-2">
                    <p className="bg-primary text-white p-2 rounded-circle">{`${res.first_name[0]}${res.last_name[0]}`}</p>
                  </div>

                  <div className="flex-grow-1">
                    <div className="fw-bold">{`${res.first_name} ${res.last_name}`}</div>
                    <div
                      dangerouslySetInnerHTML={{ __html: res.comment_content }}
                    />
                  </div>
                </ListGroup.Item>
              );
            })
          : ''}
      </ListGroup>

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="my-2" controlId="formBasicPassword">
          <RichTextBox
            name="comment_content"
            values={values}
            setValues={setValues}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          <i className="fas fa-paper-plane" />
        </Button>
      </Form>
    </>
  );
};
export default Comment;
