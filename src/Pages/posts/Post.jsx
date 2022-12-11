import React, {useEffect, useState} from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatart from "../../components/Avatart";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/Axios";
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
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    setPosts,
  } = props;
  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [post, setPost] = useState({ results: [] });

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        if (err.response?.status === 404) {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, id]);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
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
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Card}>
      <Card.Body>
        <Card.Header className={`${styles.CardHeader} align-items-center justify-content-between`}>
          <Link to={`/profiles/${profile_id}/`} className={styles.Decoration}>
            <Avatart   src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center p-1">
            <span className="mx-2">{updated_at}</span>
            {is_owner && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Card.Header>
      </Card.Body>
      <Link to={`/profiles/${profile_id}/`}>
        <Card.Img className={styles.Test} src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
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
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
      {currentUser ? (
        <CreateComment
      profile_id={currentUser.profile_id}
      profileImage={profile_image}
      post={id}
      setPost={setPost}
      setComments={setComments} />
      ):<div>socrates moc</div>}
      <div className={styles.Scroll}>
      {comments.results.length ? (
            comments.results.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                setPost={setPost}
                setComments={setComments}
              />
            ))
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
      </div>
    </Card>
  );
};

export default Post;
