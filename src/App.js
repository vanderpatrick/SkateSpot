import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import SignUp from "./Pages/registrations/SignUp";
import SignIn from "./Pages/registrations/SignIn";
import CreatePost from "./Pages/creations/CreatePost";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostsPage from "./Pages/posts/PostsPage";
import PostEditForm from "./Pages/posts/PostEdit";
import ProfilePage from "./Pages/profiles/ProfilePage";
import ProfileEditForm from "./Pages/creations/ProfileEditForm";
import UserPasswordForm from "./Pages/creations/PasswordChange";
import UsernameForm from "./Pages/creations/UsernameChange";
import Test from "./Pages/profiles/Test.jsx"
function App() {
  const currentUser = useCurrentUser()
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
        <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
        <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
        <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route exact path="/posts/create" render={() => <CreatePost />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/test" render={() => <Test />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
