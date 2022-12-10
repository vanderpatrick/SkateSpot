import { axiosRes } from "../../api/Axios";
import React, { useState } from "react";
import Avatart from "../../components/Avatart";
import styles from "../../styles/CreateComment.module.css";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function CreateComment(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatart src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment"
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        disabled={!content.trim()}
        className={`${styles.Button} btn d-block ml-auto`}
        type="submit"
      >
        Post
      </button>
    </Form>
  );
}

export default CreateComment;
