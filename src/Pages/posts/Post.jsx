import React from "react";
import { Card, Button } from "react-bootstrap";
import Avatart from "../../components/Avatart";
import styles from "../../styles/Post.module.css";
import { useCurrentuser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
  } = props;
  const currentUser = useCurrentuser();
  const is_owner = currentUser === owner;

  return (
    <Card style={{ width: "80%" }}>
      <Card.Header className={styles.CardHeader}>
        <Link className={styles.Decoration} to={`/profiles/${profile_id}`}>
          <Avatart
            text={currentUser?.username}
            src={profile_image}
            height={55}
          />
        </Link>
        {updated_at}
      </Card.Header>
      <Card.Img variant="top" src={image} />
      <Card.Body className={styles.Card}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default Post;
