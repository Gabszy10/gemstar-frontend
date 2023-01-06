import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import cookie from 'js-cookie';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { logout, isAuthenticated } from '../../../store/action';
import { navLinks } from '../../../store/constants/navLinks';
import './index.css';
import Notification from './Notification';

const recursiveNavs = (newNavLinks, logout, props) => {
  return newNavLinks.map(link => {
    if (!!link.child) {
      return (
        <NavDropdown title={link.label} id={link.id}>
          {recursiveNavs(link.child, logout)}
        </NavDropdown>
      );
    }

    if (link.id === 'logout') {
      return (
        <NavDropdown.Item eventKey={link.id}>
          <Link
            className="text-dark text-decoration-none"
            to={link.to}
            onClick={() => {
              cookie.remove('_wus_BJK');
              toast.error('Session Timeout!', {
                position: toast.POSITION.TOP_CENTER
              });

              window.location.href = "/"
            }}>
            {link.label}
          </Link>
        </NavDropdown.Item>
      );
    }

    return (
      <NavDropdown.Item eventKey={link.id}>
        <Link className="text-dark text-decoration-none" to={link.to}>
          {link.label}
        </Link>
      </NavDropdown.Item>
    );
  });
};

const Header = props => {
  const {
    isLoggedIn,
    userLevel = 'csm',
    isAuthenticated,
    logout,
    users
  } = props;
  const [newNavLinks, setNewNavLinks] = useState(navLinks.default);

  useEffect(() => {
    isAuthenticated();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setNewNavLinks(navLinks[userLevel]);
    } else {
      setNewNavLinks(navLinks.default);
    }
    isAuthenticated();
  }, [isLoggedIn]);

  return (
    <Navbar
      className="py-0"
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark">
      <Container className="d-flex">
        <Navbar.Brand>
          <Link className="text-white text-decoration-none" to={`/`}>
            {process.env.REACT_APP_NAME}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            navbarScroll
            style={{ maxHeight: '150px' }}
            className="ms-auto text-primary">
            {newNavLinks.map(link => {
              if (link.id === 'notification') {
                return <Notification link={link} />;
              }

              // if link has child
              if (!!link.child) {
                return link.icon ? (
                  <OverlayTrigger
                    key={`overlay-${link.id}`}
                    placement={'bottom'}
                    overlay={
                      <Tooltip id={`tooltip-${link.id}`}>{link.label}</Tooltip>
                    }>
                    <NavDropdown
                      title={link.icon ? link.icon : link.label}
                      id={link.id}>
                      {recursiveNavs(link.child, logout)}
                    </NavDropdown>
                  </OverlayTrigger>
                ) : (
                  <NavDropdown
                    title={link.icon ? link.icon : link.label}
                    id={link.id}>
                    {recursiveNavs(link.child, logout)}
                  </NavDropdown>
                );
              }

              // if link does not have child
              return (
                <Nav.Link key={link.id}>
                  {link.icon ? (
                    <OverlayTrigger
                      key={`overlay-${link.id}`}
                      placement={'bottom'}
                      overlay={
                        <Tooltip id={`tooltip-${link.id}`}>
                          {link.label}
                        </Tooltip>
                      }>
                      <Link
                        className="text-white text-decoration-none"
                        to={link.to}>
                        {link.icon ? link.icon : link.label}
                      </Link>
                    </OverlayTrigger>
                  ) : (
                    <Link
                      className="text-white text-decoration-none"
                      to={link.to}>
                      {link.label}
                    </Link>
                  )}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.app.isAuthenticated,
    users: state.auth,
    userLevel: state.auth.user_level_acc
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isAuthenticated: () => dispatch(isAuthenticated()),
    // loginUser: props => dispatch(loginUser(props)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
