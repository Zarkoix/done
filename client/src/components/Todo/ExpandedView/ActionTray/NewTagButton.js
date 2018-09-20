import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TagIcon from "@material-ui/icons/Label";
import { GET_ALL_TODOS } from "../../../../queries";

const ADD_TAG = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodoById(input: { id: $id }) {
      todo {
        id
      }
    }
  }
`;

// update={(
//   cache,
//   { // TODO: checkout apollo cache for tagmaps
//     data: {
//       deleteTodoById: {
//         todo: { id }
//       }
//     }
//   }
// ) => {
//   const { allTodos } = cache.readQuery({ query: GET_ALL_TODOS });
//   const newNodes = allTodos.nodes.filter(node => node.id !== id);
//   cache.writeQuery({
//     query: GET_ALL_TODOS,
//     data: { allTodos: { ...allTodos, nodes: newNodes } }
//   });
// }}

export default withStyles({})(({ classes, id }) => (
  <Mutation
    mutation={ADD_TAG}
  >
    {addTag => (
      <IconButton
        className={classes.button}
        aria-label="New Tag"
        onClick={() =>
          addTag({
            variables: {// TODO fix this
              todoid: id,
              tagid: id
            }
          })
        }
      >
        <TagIcon />
      </IconButton>
    )}
  </Mutation>
));
