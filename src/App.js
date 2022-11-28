import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import SignUp from "./Pages/registrations/SignUp";
import SignIn from "./Pages/registrations/SignIn";
import CreatePost from "./Pages/creations/CreatePost";
import PostPage from "./Pages/posts/PostPage";
function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Hellow</h1>} />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route exact path="/posts/create" render={() => <CreatePost />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
