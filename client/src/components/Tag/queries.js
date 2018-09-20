import gql from "graphql-tag";

const GET_TODO_TAGS = gql`
  query getCompleteTodoData($id: Int!) {
    todoById(id: $id) {
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
`;

const TODO_DELETE_TAG = gql`
  mutation todoAddTag($todoId: Int!, $tagId: Int!) {
    todoDeleteTag(input: { todoId: $todoId, tagId: $tagId }) {
      todo {
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

export { GET_TODO_TAGS, TODO_DELETE_TAG };
