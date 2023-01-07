import React, { useEffect, useState } from "react";
import { Button, Card, Badge, Row, Col, Table } from "react-bootstrap";
import parse from 'html-react-parser';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MainBody from "../../UI/MainBody";
import {
  getProjectAsAdmin,
  getProjects,
  getProjectsTable,
  incrementClick,
} from "../../../store/action";
import {
  dateFormatDistance,
  dateFormatting,
} from "../../Shared/Helpers/dateFormat";

const Projects = (props) => {
  const {
    getProjectAsAdmin,
    getProjects,
    projectList,
    user_level_acc,
    getProjectsTable,
  } = props;
  const fetchProjects = user_level_acc === "owner" ? getProjectAsAdmin : (user_level_acc === "emp" ? getProjects : getProjects);

  const [isTable, setIsTable] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProjecto();
  }, [isTable]);

  const fetchProjecto = async () => {
    if (isTable) {
      await getProjectsTable();
      setIsLoading(false)
    } else {
      await fetchProjects();
      setIsLoading(false)
    }
  }

  console.log("Project", projectList)

  const CardList = () => {
    return projectList.length > 0 ? (
      <>
        <Row>
          <Col xs={12} md={3} lg={3}>
            <Row>
              {projectList.map((project, index) => {
                return (
                  <>
                    {project.status_name === "To Do" && <Col
                      key={`project-${index}`}
                      xs={12}
                      md={12}
                      lg={12}
                      className="my-2"
                    >
                      <Link
                        to={`/manage/${project.project_id}`}
                        className="list-group-item list-group-item-action flex-column align-items-start"
                        style={{ height: '140px' }}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{project.project_name}</h5>
                          <small>
                            Deadline {dateFormatDistance(
                              project.end_date,
                              Date.now()
                            )}
                          </small>
                        </div>
                        <p className="mb-0 fw-normal text-muted">
                          {parse(project.project_description
                            .replace(/<p>/g, " ")
                            .replace(/<\/p>/g, " ")
                            .replace(/<h1>/g, " ")
                            .replace(/<\/h1>/g, " ")
                            .replace(/<h2>/g, " ")
                            .replace(/<\/h2>/g, " ")
                            .replace(/<h3>/g, " ")
                            .replace(/<\/h3>/g, " ")
                            .replace(/<br>/g, " ")
                            .replace(/<ol>/g, " ")
                            .replace(/<\/ol>/g, " ")
                            .replace(/<li>/g, " ")
                            .replace(/<\/li>/g, " ")
                            .replace(/<\/strong>/g, " ")
                            .replace(/<strong>/g, " ")
                            .replace(/<em>/g, " ")
                            .replace(/<\/em>/g, " ")
                            .slice(0, 50)) ?? "No Description"}
                          {project.project_description.length > 40 ? '...' : ''}
                        </p>
                        <p className="mb-0 fw-normal text-muted">
                          <Badge bg={project.status_acr}>
                            {project.status_name}
                          </Badge>{" "}
                          {project.assignedEmployees.length ? project.assignedEmployees.map((a, i) => (
                            <span>{a.first_name} {project.assignedEmployees.length != i ? ',' : null}</span>
                          )) : null}
                        </p>
                        <p>{project.click} Views</p>
                      </Link>
                    </Col>}
                  </>
                );
              })}
            </Row>
          </Col>

          <Col xs={12} md={3} lg={3}>
            <Row>
              {projectList.map((project, index) => {
                return (
                  <>
                    {project.status_name === "Pending" && <Col
                      key={`project-${index}`}
                      xs={12}
                      md={12}
                      lg={12}
                      className="my-2"
                    >
                      <Link
                        to={`/manage/${project.project_id}`}
                        className="list-group-item list-group-item-action flex-column align-items-start"
                        style={{ height: '140px' }}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{project.project_name}</h5>
                          <small>
                            Deadline {dateFormatDistance(
                              project.end_date,
                              Date.now()
                            )}
                          </small>
                        </div>
                        <p className="mb-0 fw-normal text-muted">
                          {parse(project.project_description
                            .replace(/<p>/g, " ")
                            .replace(/<\/p>/g, " ")
                            .replace(/<h1>/g, " ")
                            .replace(/<\/h1>/g, " ")
                            .replace(/<h2>/g, " ")
                            .replace(/<\/h2>/g, " ")
                            .replace(/<h3>/g, " ")
                            .replace(/<\/h3>/g, " ")
                            .replace(/<br>/g, " ")
                            .replace(/<ol>/g, " ")
                            .replace(/<\/ol>/g, " ")
                            .replace(/<li>/g, " ")
                            .replace(/<\/li>/g, " ")
                            .replace(/<\/strong>/g, " ")
                            .replace(/<strong>/g, " ")
                            .replace(/<em>/g, " ")
                            .replace(/<\/em>/g, " ")
                            .slice(0, 50)) ?? "No Description"}
                          {project.project_description.length > 40 ? '...' : ''}
                        </p>
                        <p className="mb-0 fw-normal text-muted">
                          <Badge bg={project.status_acr}>
                            {project.status_name}
                          </Badge>{" "}
                          {project.assignedEmployees.length ? project.assignedEmployees.map((a, i) => (
                            <span>{a.first_name} {project.assignedEmployees.length != i ? ',' : null}</span>
                          )) : null}
                        </p>
                        <p>{project.click} Views</p>
                      </Link>
                    </Col>}
                  </>
                );
              })}
            </Row>
          </Col>

          <Col xs={12} md={3} lg={3}>
            <Row>
              {projectList.map((project, index) => {
                return (
                  <>
                    {project.status_name === "In Progress" && <Col
                      key={`project-${index}`}
                      xs={12}
                      md={12}
                      lg={12}
                      className="my-2"
                    >
                      <Link
                        to={`/manage/${project.project_id}`}
                        className="list-group-item list-group-item-action flex-column align-items-start"
                        style={{ height: '140px' }}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{project.project_name}</h5>
                          <small>
                            Deadline {dateFormatDistance(
                              project.end_date,
                              Date.now()
                            )}
                          </small>
                        </div>
                        <p className="mb-0 fw-normal text-muted">
                          {parse(project.project_description
                            .replace(/<p>/g, " ")
                            .replace(/<\/p>/g, " ")
                            .replace(/<h1>/g, " ")
                            .replace(/<\/h1>/g, " ")
                            .replace(/<h2>/g, " ")
                            .replace(/<\/h2>/g, " ")
                            .replace(/<h3>/g, " ")
                            .replace(/<\/h3>/g, " ")
                            .replace(/<br>/g, " ")
                            .replace(/<ol>/g, " ")
                            .replace(/<\/ol>/g, " ")
                            .replace(/<li>/g, " ")
                            .replace(/<\/li>/g, " ")
                            .replace(/<\/strong>/g, " ")
                            .replace(/<strong>/g, " ")
                            .replace(/<em>/g, " ")
                            .replace(/<\/em>/g, " ")
                            .slice(0, 50)) ?? "No Description"}
                          {project.project_description.length > 40 ? '...' : ''}
                        </p>
                        <p className="mb-0 fw-normal text-muted">
                          <Badge bg={project.status_acr}>
                            {project.status_name}
                          </Badge>{" "}
                          {project.assignedEmployees && project.assignedEmployees.length ? project.assignedEmployees.map((a, i) => (
                            <span> {a.first_name}{project.assignedEmployees.length != i + 1 ? ',' : null}</span>
                          )) : null}
                        </p>
                        <p>{project.click} Views</p>
                      </Link>
                    </Col>}
                  </>
                );
              })}
            </Row>
          </Col>

          <Col xs={12} md={3} lg={3}>
            <Row>
              {projectList.map((project, index) => {
                return (
                  <>
                    {project.status_name === "Done" && <Col
                      key={`project-${index}`}
                      xs={12}
                      md={12}
                      lg={12}
                      className="my-2"
                    >
                      <Link
                        to={`/manage/${project.project_id}`}
                        className="list-group-item list-group-item-action flex-column align-items-start"
                        style={{ height: '140px' }}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{project.project_name}</h5>
                          <small>
                            Deadline {dateFormatDistance(
                              project.end_date,
                              Date.now()
                            )}
                          </small>
                        </div>
                        <p className="mb-0 fw-normal text-muted">
                          {parse(project.project_description
                            .replace(/<p>/g, " ")
                            .replace(/<\/p>/g, " ")
                            .replace(/<h1>/g, " ")
                            .replace(/<\/h1>/g, " ")
                            .replace(/<h2>/g, " ")
                            .replace(/<\/h2>/g, " ")
                            .replace(/<h3>/g, " ")
                            .replace(/<\/h3>/g, " ")
                            .replace(/<br>/g, " ")
                            .replace(/<ol>/g, " ")
                            .replace(/<\/ol>/g, " ")
                            .replace(/<li>/g, " ")
                            .replace(/<\/li>/g, " ")
                            .replace(/<\/strong>/g, " ")
                            .replace(/<strong>/g, " ")
                            .replace(/<em>/g, " ")
                            .replace(/<\/em>/g, " ")
                            .slice(0, 50)) ?? "No Description"}
                          {project.project_description.length > 40 ? '...' : ''}
                        </p>
                        <p className="mb-0 fw-normal text-muted">
                          <Badge bg={project.status_acr}>
                            {project.status_name}
                          </Badge>{" "}
                          {project.assignedEmployees && project.assignedEmployees.length ? project.assignedEmployees.map((a, i) => (
                            <span> {a.first_name}{project.assignedEmployees.length != i + 1 ? ',' : null}</span>
                          )) : null}
                        </p>
                        <p>{project.click} Views</p>
                      </Link>
                    </Col>}
                  </>
                );
              })}
            </Row>
          </Col>

          <Col xs={12} md={3} lg={3}>
            <Row>
              {projectList.map((project, index) => {
                return (
                  <>
                    {project.status_name === "Cancelled" && <Col
                      key={`project-${index}`}
                      xs={12}
                      md={12}
                      lg={12}
                      className="my-2"
                    >
                      <Link
                        to={`/manage/${project.project_id}`}
                        className="list-group-item list-group-item-action flex-column align-items-start"
                        style={{ height: '140px' }}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{project.project_name}</h5>
                          <small>
                            Deadline {dateFormatDistance(
                              project.end_date,
                              Date.now()
                            )}
                          </small>
                        </div>
                        <p className="mb-0 fw-normal text-muted">
                          {parse(project.project_description
                            .replace(/<p>/g, " ")
                            .replace(/<\/p>/g, " ")
                            .replace(/<h1>/g, " ")
                            .replace(/<\/h1>/g, " ")
                            .replace(/<h2>/g, " ")
                            .replace(/<\/h2>/g, " ")
                            .replace(/<h3>/g, " ")
                            .replace(/<\/h3>/g, " ")
                            .replace(/<br>/g, " ")
                            .replace(/<ol>/g, " ")
                            .replace(/<\/ol>/g, " ")
                            .replace(/<li>/g, " ")
                            .replace(/<\/li>/g, " ")
                            .replace(/<\/strong>/g, " ")
                            .replace(/<strong>/g, " ")
                            .replace(/<em>/g, " ")
                            .replace(/<\/em>/g, " ")
                            .slice(0, 50)) ?? "No Description"}
                          {project.project_description.length > 40 ? '...' : ''}
                        </p>
                        <p className="mb-0 fw-normal text-muted">
                          <Badge bg={project.status_acr}>
                            {project.status_name}
                          </Badge>{" "}
                          {project.assignedEmployees.length ? project.assignedEmployees.map((a, i) => (
                            <span>{a.first_name} {project.assignedEmployees.length != i ? ',' : null}</span>
                          )) : null}
                        </p>
                        <p>{project.click} Views</p>
                      </Link>
                    </Col>}
                  </>
                );
              })}
            </Row>
          </Col>
        </Row>
      </>
    ) : (
      <h5 className="border py-3 text-center">{isLoading ? 'Loading...' : 'No Projects'}</h5>
    );
  };

  const TableComponent = () => {
    return (
      <Table bordered hover>
        <thead>
          <tr className="text-center">
            <th>PROJECT NAME</th>
            <th>CLIENT NAME</th>
            <th>ENGINE MODEL</th>
            <th>STATUS</th>
            <th>DATE RANGE</th>
            <th>TOTAL AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {projectList.length > 0 && projectList[0].total_price
            ? projectList.map((res) => {
              return (
                <tr>
                  <td>
                    <Link to={`/manage/${res.project_id}`}>
                      {res.project_name}
                    </Link>
                  </td>
                  <td>{`${res.first_name} ${res.last_name}`}</td>
                  <td>{res.engine_model || ""}</td>
                  <td className={`text-center text-${res.status_acr}`}>
                    {res.status_name}
                  </td>
                  <td className="text-center">
                    {dateFormatting(res.start_date, "mdy")} -{" "}
                    {dateFormatting(res.end_date, "mdy")}
                  </td>
                  <td className="text-center">{res.total_price}</td>
                </tr>
              );
            })
            : ""}
        </tbody>
      </Table>
    );
  };

  return (
    <MainBody>
      <Row>
        <Col className="border-bottom mb-3 d-flex justify-content-between">
          <Card.Title className="ms-2">PROJECTS</Card.Title>
          <div className="d-flex align-items-start mb-2">
            {user_level_acc === "owner" && (
              <React.Fragment>
                <Button
                  variant="secondary"
                  className="me-2 p-1"
                  size="sm"
                  onClick={() => setIsTable(true)}
                >
                  <i class="fas fa-list" />
                </Button>
                <Button
                  variant="secondary"
                  className="p-1"
                  size="sm"
                  onClick={() => setIsTable(false)}
                >
                  <i class="fab fa-buromobelexperte" />
                </Button>
              </React.Fragment>
            )}
            {user_level_acc === "csm" ? (
              <Link to={`/create`}>
                <Button variant="primary">Create Project</Button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>

      {!isTable ? <CardList /> : <TableComponent />}
    </MainBody>
  );
};

const mapStateToProps = (state) => {
  return {
    projectList: state.projectList,
    user_level_acc: state.auth.user_level_acc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectAsAdmin: () => dispatch(getProjectAsAdmin()),
    getProjects: () => dispatch(getProjects()),
    getProjectsTable: () => dispatch(getProjectsTable()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
