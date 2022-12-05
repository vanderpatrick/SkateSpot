import React, { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import { axiosReq } from "../../api/Axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Profile from "./Profile";
import styles from "../../styles/profiles.module.css";
import Asset from "../../components/Asset";

const PopularProfiles = () => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/");
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
        console.log(data)
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${styles.Content}  ${styles.Border} ${"text-center mb-3"}`}
    >
      {popularProfiles.results.length ? (
        <>
          <div className=" d-flex justify-content-around">
            <Carousel className={styles.Carousel}>
            {popularProfiles.results.map((profile) => (
              <Carousel.Item className={styles.CarouselItem}>
              <Profile key={profile.id} profile={profile} />
              </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </>
      ) : (
        <Asset />
      )}
    </Container>
  );
};

export default PopularProfiles;
