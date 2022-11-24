import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../../styles/Signin.module.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSetCurrentuser } from "../../contexts/CurrentUserContext";

const SignIn = () => {
  const setCurrentUser = useSetCurrentuser()
  const [signInData, setsignIndata] = useState({
    usernmae: "",
    password: "",
  });
  const history = useHistory();

  const { username, password } = signInData;

  const handleChange = (event) => {
    setsignIndata({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      const {data} = await axios.post("/dj-rest-auth/login/", signInData)
      setCurrentUser(data.user)
      history.push("/")
    }catch(err){
      console.log(err)
    }
  }
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
      <Form.Group >
        <Link className={`${styles.Link}`}>Dont have an account ? register now!</Link>
      </Form.Group>
      <Button className={styles.FormButton} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignIn;
