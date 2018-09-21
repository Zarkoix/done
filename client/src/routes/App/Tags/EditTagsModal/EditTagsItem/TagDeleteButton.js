import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { GET_ALL_TAGS } from "../../../../../components/Tag/queries.js";

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
      const { allTags } = cache.readQuery({ query: GET_ALL_TAGS });
      const newNodes = allTags.nodes.filter(node => node.id !== id);
      cache.writeQuery({
        query: GET_ALL_TAGS,
        data: { allTags: { ...allTags, nodes: newNodes } }
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
