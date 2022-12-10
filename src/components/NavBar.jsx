import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import logo from "../Assets/logo.png";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatart";
import Toggle from "../hooks/Toggle";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";

const NavBar = () => {
  const Currentuser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = Toggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="far fa-plus-square"></i>Add post
    </NavLink>
  );
  const LogginIcons = (
    <>
      <NavLink onClick={handleSignOut} to="/signin" className={`${styles.NavLink} ${styles.NavLinkMargin}`}>
        <i className="fas fa-sign-in-alt"></i>Logout
      </NavLink>
      <NavLink to="/favorites" className={`${styles.NavLink} ${styles.NavLinkMargin}`}>
        <i className="fas fa-sign-in-alt"></i>Favorites
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${Currentuser?.profile_id}`}
      >
        <Avatar
          src={Currentuser?.profile_image}
          text={Currentuser?.username}
          height={40}
        />
      </NavLink>
    </>
  );

  const LogedOutIcon = (
    <>
      <NavLink to="/signin" className={`${styles.NavLink} ${styles.NavLinkMargin}`}>
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink to="/signup" className={`${styles.NavLink} ${styles.NavLinkMargin}`}>
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );
  return (
    <Container>
      <Navbar
        expanded={expanded}
        className={styles.NavBar}
        expand="md"
        fixed="top"
      >
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="45" />
            </Navbar.Brand>
          </NavLink>
          {Currentuser && addPostIcon}
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-left">
              <NavLink exact to="/" className={`${styles.NavLink} ${styles.NavLinkMargin}`}>
                <i className="fas fa-home"></i>Home
              </NavLink>
              {Currentuser ? LogginIcons : LogedOutIcon}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default NavBar;
