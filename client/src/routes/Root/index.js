import React from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import Dashboard from './Dashboard'
import Splash from './Splash'

const GET_JWT = gql`
  {
    JWT @client
  }
`;

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
