import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { GET_ALL_TODOS } from "../../../../queries";

const DELTE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodoById(input: { id: $id }) {
      todo {
        id
      }
    }
  }
`;

export default withStyles({})(({ classes, id }) => (
  <Mutation
    mutation={DELTE_TODO}
    update={(
      cache,
      {
        data: {
          deleteTodoById: {
            todo: { id }
          }
        }
      }
    ) => {
      const { allTodos } = cache.readQuery({ query: GET_ALL_TODOS });
      const newNodes = allTodos.nodes.filter(node => node.id !== id);
      cache.writeQuery({
        query: GET_ALL_TODOS,
        data: { allTodos: { ...allTodos, nodes: newNodes } }
      });
    }}
  >
    {deleteTodo => (
      <IconButton
        className={classes.button}
        aria-label="Delete"
        onClick={() =>
          deleteTodo({
            variables: {
              id: id
            }
          })
        }
      >
        <DeleteIcon />
      </IconButton>
    )}
  </Mutation>
));
