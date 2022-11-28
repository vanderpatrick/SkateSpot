import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatart from "../../components/Avatart";
import styles from "../../styles/Post.module.css";
import { useCurrentuser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/Axios";
const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    like_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    setposts,
  } = props;
  const currentUser = useCurrentuser();
  const is_owner = currentUser === owner;

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setposts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, like_count: post.like_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}`);
      setposts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, like_count: post.like_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card style={{ width: "80%" }}>
      <Card.Header className={styles.CardHeader}>
        <Link className={styles.Decoration} to={`/profiles/${profile_id}`}>
          <Avatart text={owner} src={profile_image} height={55} />
        </Link>
        <span>{updated_at}</span>
      </Card.Header>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        {title && <Card.Title>{title} </Card.Title>}
        {content && <Card.Text className="text-center">{content}</Card.Text>}
        <div className={styles.Space}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {like_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
