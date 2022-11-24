import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../../styles/Signin.module.css"
const SignIn = () => {
  return (
    <Form className={styles.FormContainer}>
      <h1 className="text-center mb-5">Welcome to skateSpot please fill in your info</h1>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="text" placeholder="Enter username" />
    </Form.Group>

    <Form.Group className="mb-3" >
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Enter password" />
    </Form.Group>
    <Button className={styles.FormButton} type="submit">
      Submit
    </Button>
  </Form>
  )
}

export default SignIn