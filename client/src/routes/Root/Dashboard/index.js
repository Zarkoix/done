import React from "react";
import { Query } from "react-apollo";
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
    <h1>Todos</h1>
    <Query query={GET_ALL_TODOS}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        return data.allTodos.nodes.map((todo, i) =>
          <Paper key={i}><h2>{todo.headline}</h2></Paper>
        )
      }}
    </Query>
  </React.Fragment>
);
