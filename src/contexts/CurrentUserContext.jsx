import { createContext, useContext,useMemo, useEffect, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/Axios";
import { useHistory } from "react-router-dom";
export const CurrentUserContext = createContext();
export const setCurrentUserContext = createContext();

export const useCurrentuser = () => useContext(CurrentUserContext);
export const useSetCurrentuser = () => useContext(setCurrentUserContext);

export const CurrentUsertProvider = ({ children }) => {
    const history = useHistory()
  const [currentUser, setCurrentUser] = useState(null);
  const handleMount = async () => {
    try {
      const { data } = await axios.get("https://skt-drf.herokuapp.com/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <setCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </setCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
