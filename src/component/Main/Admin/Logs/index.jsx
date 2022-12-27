import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Alert, Col, Form, Row } from 'react-bootstrap';

import { fetchLogs } from '../../../../store/action';
import MainBody from '../../../UI/MainBody';
import { dateFormatting } from '../../../Shared/Helpers/dateFormat';

const dropdownValue = [10, 25, 50, 100, 200];

const LogList = props => {
  const { fetchLogs, logManagement } = props;
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [sizePerPage, setSizePerPage] = useState(25);

  const handlePageClick = data => {
    setPage(data.selected);
  };

  const handleSelectChange = e => {
    const { value } = e.target;
    setSizePerPage(value);
  };

  console.log({ logManagement });

  useEffect(() => {
    const newCount = Math.ceil(logManagement.totalCount / sizePerPage);
    setPageCount(newCount);
  }, [logManagement.totalCount, sizePerPage]);

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <MainBody>
      <h1 className="border-bottom p-2">Log Lists</h1>
      <Row className="mb-3">
        <Col>
          {logManagement.data.map((res, index) => {
            return (
              <Alert
                className="border px-3 py-1 mb-1"
                key={res.logs_id}
                variant="light">
                {dateFormatting(res.created_at, 'logs')} :{' '}
                <span className="fw-bold">{res.logs_type}</span> {'\t | '}
                {res.remarks}
              </Alert>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Select style={{ width: 75 }} onChange={handleSelectChange}>
            {dropdownValue.map(res => (
              <option
                key={`id-${res}`}
                value={res}
                selected={res === sizePerPage}>
                {res}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col className="d-flex justify-content-end">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={page}
          />
        </Col>
      </Row>
    </MainBody>
  );
};

const mapStateToProps = state => {
  return {
    logManagement: state.logManagement
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLogs: () => dispatch(fetchLogs())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogList);
