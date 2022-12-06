import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useHistory, useParams } from "react-router-dom";
import styles from "../../styles/CreatePost.module.css";
import { Row, Form, Col, Figure, Image, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/Axios";
function PostEditForm() {
  const history = useHistory();
  const { id } = useParams();
  const imageInput = useRef(null);
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);
        const { title, content, image, is_owner } = data;

        is_owner ? setPostData({ title, content, image }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit} className={styles.FormContainer}>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Form.Group>
            {image ? (
              <>
                <Figure>
                  <Image className={styles.Image} src={image} rounded />
                </Figure>
              </>
            ) : (
              <Form.Label htmlFor="image-upload">
                <Figure className={styles.UploadSize}>
                  <i className="fa-solid fa-upload"></i>
                </Figure>
              </Form.Label>
            )}
            <Form.Control
              type="file"
              className="d-none"
              id="image-upload"
              ref={imageInput}
              accept="image/*"
              onChange={handleChangeImage}
            />
          </Form.Group>
          {errors?.image?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title :</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={title}
            />
          </Form.Group>
          {errors?.title?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group className="mb-5">
            <Form.Label>Content :</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              value={content}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.content?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>
      <Button className={styles.FormButton} type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default PostEditForm;
