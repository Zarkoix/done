import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Root from "./routes/Root";
import About from "./routes/About";
import Signup from "./routes/Signup";
import Login from "./routes/Login";

import { jwtFromCache } from './auth.js'


const client = new ApolloClient({
  uri: "/graphql", // TODO: point this at server
  clientState: {
    defaults: {
      JWT: jwtFromCache()
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App>
        <Route exact path="/" component={Root} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </App>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
