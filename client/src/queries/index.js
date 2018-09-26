import gql from "graphql-tag";

export const GET_COMPLETE_TODO_DATA = gql`
  query GetAllTodos {
    allTodos {
      nodes {
        id
        headline
        completed
        doWhenDate
        getTags {
          nodes {
            id
            name
            color
          }
        }
      }
    }
  }
`;

export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    allTodos {
      nodes {
        id
        headline
        completed
        doWhenDate
      }
    }
  }
`;

export const GET_ALL_TODOS_WITH_TAGS = gql`
  query GetAllTodos {
    allTodos {
      nodes {
        id
        getTags {
          nodes {
            id
            name
            color
          }
        }
      }
    }
  }
`;

export const GET_TODOS_FOR_DATE = gql`
  query GetTodosForDate($date: Date!) {
    allTodos(condition: { doWhenDate: $date }) {
      nodes {
        id
        headline
        completed
      }
    }
  }
`;
