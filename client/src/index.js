import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme.js";

import { withNavigation } from "./components/Navigation";

import About from "./routes/Static/About";
import Splash from "./routes/Static/Splash";
import Signup from "./routes/User/Signup";
import Login from "./routes/User/Login";
import Settings from "./routes/User/Settings";

import Today from "./routes/App/Today";
import Inbox from "./routes/App/Inbox";

import { jwtFromCache } from "./auth.js";

const client = new ApolloClient({
  uri: "/graphql",
  request: async operation => {
    const token = jwtFromCache();
    if (token) {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ""
        }
      });
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <React.Fragment>
          <Route
            exact
            path="/"
            render={props =>
              Boolean(jwtFromCache()) ? <Redirect to="/Today" /> : <Splash />
            }
          />
          <Route path="/About" component={About} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
          <Route path="/Settings" component={withNavigation(Settings)} />
          <Route path="/Today" component={withNavigation(Today)} />
          <Route path="/Inbox" component={withNavigation(Inbox)} />
        </React.Fragment>
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
