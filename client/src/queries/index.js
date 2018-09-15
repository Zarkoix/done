import gql from "graphql-tag";

export const GET_ALL_TODOS = gql`
  query GetAllTodos{
    allTodos {
      nodes {
        id
        headline
        completed
      }
    }
  }
`;
