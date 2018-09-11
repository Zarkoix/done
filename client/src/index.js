import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "./routes/Dashboard";
import About from "./routes/About";
import Signup from "./routes/Signup";
import Login from "./routes/Login";


const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql" // TODO: point this at server
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <App />
        <Route exact path="/" component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
