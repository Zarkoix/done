import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tag from "../../Tag";
import CloseIcon from "@material-ui/icons/Close";
import NewTag from "./NewTag.js";
import { Query } from "react-apollo";
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

const styles = theme => ({
  tagsContainer: {
    marginBottom: "8px"
  }
});

class ExpandedViewTags extends Component {
  render() {
    const { classes, id } = this.props;
    return (
      <Query query={GET_TODO_TAGS} variables={{ id: id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          let tags = data.todoById.getTags.nodes;
          return (
            <div className={classes.tagsContainer}>
              {tags.map(tag => (
                <Tag
                  title={tag.name}
                  key={tag.id}
                  showAction
                  ActionIcon={CloseIcon}
                  color={tag.color}
                />
              ))}
              {tags.length > 1 && <NewTag id={this.props.id} />}
            </div>
          );
        }}
      </Query>
    );
  }
}

ExpandedViewTags.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  text: PropTypes.string
};

export default withStyles(styles)(ExpandedViewTags);
