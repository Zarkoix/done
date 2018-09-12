import React from "react";

import { Query } from "react-apollo";

import Dashboard from './Dashboard'
import Splash from './Splash'

import { GET_JWT } from '../../auth.js'

export default () => (
  <Query query={GET_JWT}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      if (data.JWT === null) {
        return <Splash/>
      }

      return <Dashboard/>
    }}
  </Query>
);
