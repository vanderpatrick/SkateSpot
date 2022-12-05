import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatart";
import { Button, Carousel } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileContext";

const Profile = (props) => {
  const { profile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;
  const { handleFollow, handleUnfollow } = useSetProfileData();
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div
    className="my-3 d-flex align-items-center flex-column"
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div>
        <strong>{owner}</strong>
      </div>
      <div className="text-rightml-auto">
        
      </div>
    </div>
  );
};

export default Profile;
