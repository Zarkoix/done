import React from "react";
import { Query } from "react-apollo";
import { jwtFromCache } from "../../../auth.js";
import Paper from '@material-ui/core/Paper';
import gql from "graphql-tag";

export const GET_ALL_TODOS = gql`
  query {
    allTodos {
      nodes {
        headline
      }
    }
  }
`;

export const AUTHENTICATE = gql`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;

export default () => (
  <React.Fragment>
    <Paper><p>{jwtFromCache()}</p></Paper>
    <Query query={GET_ALL_TODOS}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;

        return <Paper><p>{JSON.stringify(data)}</p></Paper>;
      }}
    </Query>
  </React.Fragment>
);
