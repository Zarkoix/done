import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { GET_ALL_TAGS  } from "../../../../../components/Tag/queries.js";
import { GET_ALL_TODOS_WITH_TAGS } from "../../../../../queries"

const DELTE_TAG = gql`
  mutation deleteTag($id: Int!) {
    deleteTagById(input: { id: $id }) {
      tag {
        id
      }
    }
  }
`;

export default withStyles({})(({ classes, id }) => (
  <Mutation
    mutation={DELTE_TAG}
    update={(
      cache,
      {
        data: {
          deleteTagById: {
            tag: { id }
          }
        }
      }
    ) => {
      // update tags -- removes tag from the filters drawer
      const { allTags } = cache.readQuery({ query: GET_ALL_TAGS });
      const newTagNodes = allTags.nodes.filter(node => node.id !== id);
      cache.writeQuery({
        query: GET_ALL_TAGS,
        data: { allTags: { ...allTags, nodes: newTagNodes } }
      });

      // update all the tags on todos -- removes the tags from todos across the app
      const { allTodos } = cache.readQuery({ query: GET_ALL_TODOS_WITH_TAGS });
      const newTodoNodes = allTodos.nodes.map(todo => {
        const newTagNodes = todo.getTags.nodes.filter(node => node.id !== id)
        const newTodo = {...todo, getTags: {...todo.getTags, nodes: newTagNodes}}
        return newTodo
      });
      cache.writeQuery({
        query: GET_ALL_TODOS_WITH_TAGS,
        data: { allTodos: { ...allTodos, nodes: newTodoNodes } }
      });
    }}
  >
    {deleteTag => (
      <IconButton
        className={classes.button}
        aria-label="Delete Tag"
        onClick={() =>
          deleteTag({
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
