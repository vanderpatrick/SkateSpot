import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Container>
      <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
                <p>hello</p>
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-left">
              <NavLink to="/" className={styles.NavLink}>
                <i className="fas fa-home"></i>Home
              </NavLink>
              <NavLink to="/signin" className={styles.NavLink}>
                <i className="fas fa-sign-in-alt"></i>Sign in
              </NavLink>
              <NavLink to="/signup" className={styles.NavLink}>
                <i className="fas fa-user-plus"></i>Sign up
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default NavBar;
