import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import { GET_ALL_TODOS } from "../../../../queries";
import RightGutterMenu from "./RightGutterMenu";

const DELTE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodoById(input: { id: $id }) {
      todo {
        id
      }
    }
  }
`;

export default withStyles({})(({ id }) => (
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
      <RightGutterMenu id={id} deleteTodo={deleteTodo} />
    )}
  </Mutation>
));
