import React, { useState, useEffect } from 'react';
import { Badge, Col } from "react-bootstrap";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import { dateFormatting } from '../Shared/Helpers/dateFormat';
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((project, index) => (
                    <Col
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
                                    Deadline: {dateFormatting(new Date(project.end_date), 'mdy')}
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
                                    <span>{a.first_name}{project.assignedEmployees.length != i+1 ? ', ' : null}</span>
                                )) : null}
                            </p>
                            <p>{project.click} Views</p>
                        </Link>
                    </Col>
                ))}
        </>
    );

}

function PaginatedItems({ itemsPerPage, projectList, statusName }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [projects, setProjects] = useState([]);
    const [totalProject, setTotalProject] = useState([]);

    useEffect(() => {
        if (statusName === "Most Accessed") {
            setProjects(projectList.sort((a, b) => parseFloat(b.click) - parseFloat(a.click)));
            setTotalProject(projectList);
        } else {
            setProjects(projectList.filter(a => a.status_name === statusName));
            setTotalProject(projectList.filter(a => a.status_name === statusName));
        }
    }, [projectList, statusName])

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = projects.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(projects.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % projects.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return currentItems.length ? (
        <>
            <Col><b>TOTAL: {totalProject.length} PROJECT{totalProject.length > 1 ? 'S' : ''}</b></Col>
            <Items currentItems={currentItems} />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 20,
                boxSizing: 'border-box',
            }} >
                <ReactPaginate
                    activeClassName={'item active '}
                    breakClassName={'item break-me '}
                    breakLabel="..."
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    nextLabel=">>"
                    // nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }} />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    ) : null;
}




export default PaginatedItems