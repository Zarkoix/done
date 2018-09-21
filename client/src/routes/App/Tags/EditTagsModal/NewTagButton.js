import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { GET_ALL_TAGS } from "../../../../components/Tag/queries.js"

const CREATE_TAG = gql`
  mutation createNewTag($name: String!, $color: String!) {
    createNewTag(input: { name: $name, color: $color }) {
      tag {
        id
        name
        color
      }
    }
  }
`;

const styles = theme => ({
  buttonContainer: {
    height: "64px",
    width: "100%",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    borderRadius: "16px"
  }
});

export default withStyles(styles, { withTheme: true })(({ classes, theme }) => (
  <Mutation
    mutation={CREATE_TAG}
    update={(
      cache,
      {
        data: {
          createNewTag: { tag }
        }
      }
    ) => {
      const { allTags } = cache.readQuery({ query: GET_ALL_TAGS });
      const newNodes = allTags.nodes.concat([tag]);
      cache.writeQuery({
        query: GET_ALL_TAGS,
        data: { allTags: { ...allTags, nodes: newNodes } }
      });
    }}
  >
    {createTag => (
      <ButtonBase onClick={() => createTag({
        variables: {
          name: "New Tag!",
          color: theme.palette.secondary.main
        }
      })}
      className={classes.buttonContainer}>
        <Typography variant="button" noWrap>
          New Tag
        </Typography>
      </ButtonBase>
    )}
  </Mutation>
));
