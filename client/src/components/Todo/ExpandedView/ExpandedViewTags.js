import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tag from "../../Tag";
import CloseIcon from "@material-ui/icons/Close";
import NewTag from "./NewTag.js";
import { Query, Mutation } from "react-apollo";
import { GET_TODO_TAGS, TODO_DELETE_TAG } from "../../Tag/queries.js"

const styles = theme => ({
  tagsContainer: {
    marginBottom: "8px"
  }
});

class ExpandedViewTags extends Component {
  handleClick = (tagId, deleteTag) => {
    deleteTag({
      variables: {
        todoId: this.props.id,
        tagId: tagId
      }
    });
  };

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
              <Mutation mutation={TODO_DELETE_TAG}>
                {todoDeleteTag =>
                  tags.map(tag => (
                    <Tag
                      title={tag.name}
                      key={tag.id}
                      showAction
                      ActionIcon={CloseIcon}
                      onActionClick={() =>
                        this.handleClick(tag.id, todoDeleteTag)
                      }
                      color={tag.color}
                    />
                  ))
                }
              </Mutation>
              {tags.length > 0 && <NewTag id={this.props.id} />}
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
