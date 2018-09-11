import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./routes/Home";
import About from "./routes/About";
import Signup from "./routes/Signup";
import Login from "./routes/Login";


const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql", // TODO: point this at server
  clientState: {
    defaults: {
      JWT: localStorage.getItem('JWT')
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </App>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
