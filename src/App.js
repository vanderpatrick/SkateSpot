import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import SignUp from "./Pages/registrations/SignUp";
import SignIn from "./Pages/registrations/SignIn";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main} >
        <Switch>
        <Route exact path="/" render={() => <h1>Home page</h1>} />
        <Route exact path="/signin" render={() => <SignIn /> } />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
