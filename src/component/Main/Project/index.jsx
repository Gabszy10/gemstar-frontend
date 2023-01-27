import React, { useEffect, useState } from "react";
import { Button, Card, Badge, Row, Col, Table } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
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
import ProjectPaging from "../../UI/Project";

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

    return projectList.length > 0 ?  (
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="To Do" title="TO DO" style={{ border: 'none' }}>
          <Col md={12}>
            <Row>
              <ProjectPaging projectList={projectList} statusName="To Do" itemsPerPage={5} />
            </Row>
          </Col>
        </Tab>
        <Tab eventKey="Pending" title="PENDING" style={{ border: 'none' }}>
          <ProjectPaging projectList={projectList} statusName="Pending" itemsPerPage={5} />
        </Tab>
        <Tab eventKey="In Progress" title="IN PROGRESS" style={{ border: 'none' }}>
          <ProjectPaging projectList={projectList} statusName="In Progress" itemsPerPage={5} />
        </Tab>
        <Tab eventKey="Done" title="DONE" style={{ border: 'none' }}>
          <ProjectPaging projectList={projectList} statusName="Done" itemsPerPage={5} />
        </Tab>
        <Tab eventKey="Cancelled" title="CANCELLED" style={{ border: 'none' }}>
          <ProjectPaging projectList={projectList} statusName="Cancelled" itemsPerPage={5} />
        </Tab>
        <Tab eventKey="Most Accessed" title="MOST ACCESSED" style={{ border: 'none' }}>
          <ProjectPaging projectList={projectList} statusName="Most Accessed" itemsPerPage={5} />
        </Tab>
      </Tabs>
    ) : <h5 className="border py-3 text-center">{isLoading ? 'Loading...' : 'No Projects'}</h5>;

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
