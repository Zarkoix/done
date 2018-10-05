import React from "react";
import { Query } from "react-apollo";

import UpcomingTodoList from "./UpcomingTodoList.js";

import gql from "graphql-tag";

export const GET_ALL_TODOS_WITH_DATE = gql`
  query GetAllTodos {
    allTodos {
      nodes {
        id
        doWhenDate
      }
    }
  }
`;

export default () => {
  return (<Query query={GET_ALL_TODOS_WITH_DATE}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return <UpcomingTodoList nodes={data.allTodos.nodes} />;
    }}
  </Query>)
}
