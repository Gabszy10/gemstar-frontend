import React, { useEffect } from 'react';
import { Nav, Container, Row, Col, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getProjectAsAdmin, getProjects} from '../../../store/action'

const Profile = props => {
  const {isOwner, getProjectAsAdmin, getProjects, projectList } = props
  const fetchProjects = isOwner ? getProjectAsAdmin : getProjects;

  useEffect(() => {
    fetchProjects()
  },[])

  return (
    <Container className="my-5">
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link className="text-dark">On-going Project</Nav.Link>
          {Object.keys(projectList).length > 0 ? (
        <Row>
          {Object.keys(projectList).map((res, index) => {
            const test = projectList[res].project_description.replace(/ *\([^)]*\) */g, "")
            return (
              <Col key={`project-${index}`} className="my-2">
                <Link to={`/manage/${projectList[res].project_id}`} className="list-group-item list-group-item-action flex-column align-items-start w-100">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{projectList[res].project_name}</h5>
                    <small>3 days ago</small>
                  </div>
                  <p className="mb-0 fw-normal text-muted">{projectList[res].project_description.slice(0, 50)}</p>
                  <Badge bg={projectList[res].status_name_acr}>{projectList[res].status_name}</Badge>
                </Link>
              </Col>
            )
          })}
        </Row>
      )  : <h5 className="border py-3 text-center">No Data</h5> }
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="text-dark">Finished Project</Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    isCustomer: state.auth.user_level_acc === 'csm',
    projectList: state.projectList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectAsAdmin: () => dispatch(getProjectAsAdmin()),
    getProjects: () => dispatch(getProjects())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
