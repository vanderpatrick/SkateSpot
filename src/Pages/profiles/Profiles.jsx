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
  useEffect(
    () => {
      const handleMount = async () => {
        try {
          const { data } = await axiosReq.get(
            "/profiles/?ordering=-followers_count"
          );
          setProfileData((prevState) => ({
            ...prevState,
            popularProfiles: data,
          }));
        } catch (err) {
          console.log(err);
        }
      };

      handleMount();
    },
   
    [currentUser]
  );
  let result = [];
  let temp = [];

  popularProfiles.results.forEach((item, index) => {
    if (temp.length === 3) {
      result.push(temp);
      temp = [];
    }

    temp.push(item);

    if (index === popularProfiles.results.length - 1) {
      result.push(temp);
      temp = [];
    }
  });

  return (
    <Container
      className={`${styles.Content}  ${styles.Border} ${"text-center mb-3"}`}
    >
      {result.length ? (
        <>
          <h1>most viewd</h1>
          <div className=" d-flex  justify-content-between">
            <Carousel className={`${styles.Carousel} `}>
              {result.map((arr, index) => (
                <Carousel.Item key={index} className={styles.CarouselItem}>
                  <div className={styles.Carousel}>
                    {arr.map((profile, ind) => (
                      <Profile
                        className={styles.CarouselItem}
                        key={ind}
                        profile={profile}
                      />
                    ))}
                  </div>
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

