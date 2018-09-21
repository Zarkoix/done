import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";

const UPDATE_TAG_NAME = gql`
  mutation updateTagName($tagId: Int!, $name: String!) {
    updateTagById(input: { id: $tagId, tagPatch: { name: $name } }) {
      tag {
        id
        name
      }
    }
  }
`;

const styles = theme => ({
  nameInput: {
    ...theme.typography.subheading,
    background: "transparent",
    outline: "none",
    border: "none",
    flexGrow: 1
  }
});

class TagName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    };
  }

  // only updates local state
  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  // calls gql mutation
  handleNameUpdate = updateTagName => {
    updateTagName({
        variables: {
          tagId: this.props.id,
          name: this.state.name
        }
    });
  };

  handleKeyDown = (e, updateTagName) => {
    if (e.keyCode === 13) {
      this.handleNameUpdate(updateTagName);
      e.target.blur();
    }
  };

  render() {
    const { classes } = this.props;
    const { name } = this.state;
    return (
      <Mutation mutation={UPDATE_TAG_NAME}>
        {updateTagName => (
          <input
            type="text"
            maxLength="32"
            value={name}
            onChange={this.handleNameChange}
            onBlur={() => this.handleNameUpdate(updateTagName)}
            onKeyDown={e => this.handleKeyDown(e, updateTagName)}
            className={classes.nameInput}
          />
        )}
      </Mutation>
    );
  }
}

TagName.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(TagName);
