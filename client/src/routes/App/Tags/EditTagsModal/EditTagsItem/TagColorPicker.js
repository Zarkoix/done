import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";

const UPDATE_TAG_COLOR = gql`
  mutation updateTagColor($tagId: Int!, $color: String!) {
    updateTagById(input: { id: $tagId, tagPatch: { color: $color } }) {
      tag {
        id
        color
      }
    }
  }
`;

const styles = theme => ({
  colorInput: {
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    marginRight: "16px",
    marginLeft: "8px",
    border: "none",
    padding: "0"
  }
});

class TagColorPicker extends Component {
  render() {
    const { id, classes, color } = this.props;
    return (
      <Mutation mutation={UPDATE_TAG_COLOR}>
        {updateTagColor => (
          <input
            type="color"
            name="color"
            value={color}
            onChange={e => {
              updateTagColor({
                variables: {
                  tagId: id,
                  color: e.target.value
                }
              });
            }}
            className={classes.colorInput}
          />
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(TagColorPicker);
