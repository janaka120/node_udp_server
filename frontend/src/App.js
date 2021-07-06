import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MainContainer from "./pages/main/containers/MainContainer";
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();
class App extends Component {

  render() {
    return (
      <Router history={history}>
        <Container fluid>
          <MainContainer />
        </Container>
      </Router>
    );
  }
}

export default App;
