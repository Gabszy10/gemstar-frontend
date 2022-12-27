import React, { useState, useEffect } from 'react';
import {
  Badge,
  OverlayTrigger,
  Nav,
  Popover,
  ListGroup
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FetchNotification, DismissNotification } from '../../../store/action';

const Notification = props => {
  const { link, notifList, FetchNotification, DismissNotification } = props;

  useEffect(() => {
    FetchNotification();
  }, []);

  return (
    <React.Fragment key={link.id}>
      <OverlayTrigger
        trigger="click"
        key={link.id}
        placement="bottom"
        rootClose
        overlay={
          <Popover
            id={`popover-positioned-${link.id}`}
            style={{ width: '450px' }}>
            <Popover.Header as="h3">{link.label}</Popover.Header>
            <Popover.Body className="p-1">
              <ListGroup variant="flush">
                {notifList.data.length > 0 ? (
                  notifList.data.map(res => {
                    return (
                      <ListGroup.Item key={res.notification_id} className="px-2 d-flex">
                        <Link
                          className="text-dark text-decoration-none flex-grow-1 d-flex"
                          to={res.url_link}>
                          <div className="border rounded-circle text-white py-1 px-2 bg-primary align-self-center">
                            GS
                          </div>
                          <div className="flex-grow-1 ms-1">{res.content}</div>
                        </Link>

                        <div className="align-self-center">
                          <i
                            className="text-cancel fas fa-trash"
                            onClick={() =>
                              DismissNotification(res.notification_id).then(
                                () => {
                                  toast.error('Notification Dismissed!', {
                                    position: toast.POSITION.TOP_CENTER
                                  });
                                }
                              )
                            }
                          />
                        </div>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                  <ListGroup.Item className="px-2 d-flex">
                    No Notification
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Popover.Body>
          </Popover>
        }>
        <Nav.Link className="text-white text-decoration-none">
          {link.icon}
          {notifList.totalCount > 0 ? (
            <sup>
              <Badge bg="cancel p-1">{notifList.totalCount}</Badge>
            </sup>
          ) : (
            ''
          )}
        </Nav.Link>
      </OverlayTrigger>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    notifList: state.notifList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    FetchNotification: () => dispatch(FetchNotification()),
    DismissNotification: notificationId =>
      dispatch(DismissNotification(notificationId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
