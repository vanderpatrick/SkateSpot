import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "../../styles/CreatePost.module.css";
import { Row, Form, Col, Figure } from "react-bootstrap";
const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;
  return (
    <Form className={styles.FormContainer}>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Form.Group>
            <Form.Label htmlFor="image-upload">
              <Figure className={styles.UploadSize}>
                <i class="fa-solid fa-upload"></i>
              </Figure>
            </Form.Label>
            
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title :</Form.Label>
            <Form.Control type="text" name="title" value={title} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content :</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              value={content}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button className={styles.FormButton} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreatePost;
