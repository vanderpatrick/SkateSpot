import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import Form from "react-bootstrap/Form";
import styles from "../../styles/Signin.module.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const SignIn = () => {
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setsignIndata] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const { username, password } = signInData;
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setsignIndata({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  return (
    <Form onSubmit={handleSubmit} className={styles.FormContainer}>
      <h1 className="text-center mb-5">
        Welcome to skateSpot please fill in your info
      </h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username :</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Enter username"
        />
      </Form.Group>
      {errors.username?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Form.Group className="mb-3">
        <Form.Label>Password :</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter password"
        />
      </Form.Group>
      {errors.password?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Link to="/SignUp" className={`${styles.Link}`}>
          Dont have an account ? register now!
        </Link>
      </Form.Group>
      <Button className={styles.FormButton} type="submit">
        Log In
      </Button>
      {errors.non_field_errors?.map((message, idx) => (
        <Alert key={idx} variant="warning" className="mt-3">
          {message}
        </Alert>
      ))}
    </Form>
  );
};

export default SignIn;
