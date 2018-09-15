import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

import Root from "./routes/Root";
import About from "./routes/About";
import Signup from "./routes/Signup";
import Login from "./routes/Login";

import { jwtFromCache } from './auth.js'

const client = new ApolloClient({
  uri: "/graphql",
  request: async operation => {
    const token = jwtFromCache();
    if (token) {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      });
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Navigation>
        <Route exact path="/" component={Root} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Navigation>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
