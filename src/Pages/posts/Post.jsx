import React, { useEffect, useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatart from "../../components/Avatart";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/Axios";
import { axiosRes } from "../../api/Axios";
import { MoreDropdown } from "../../components/DropDown";
import Comment from "./PostComment";
import CreateComment from "../creations/CreateComment";
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
    postPage,
    setposts,
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [post, setPost] = useState({ results: [] });


  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };
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
  const [comments, setComments] = useState({ results: [] });
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
        console.log(post);
      } catch (err) {
        if (err.response?.status === 404) {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, id]);

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
    <Card className={styles.Card}>
      <Card.Header className={styles.CardHeader}>
        <Link className={styles.Decoration} to={`/profiles/${profile_id}`}>
          <Avatart text={owner} src={profile_image} height={55} />
        </Link>
        <span>
          {is_owner && postPage && (
            <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </span>
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
        <CreateComment
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          setPost={setPost}
          post={id}
          setComments={setComments}
        />
      </Card.Body>
    </Card>
  );
};

export default Post;
