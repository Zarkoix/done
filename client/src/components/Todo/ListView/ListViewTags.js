import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Tag from "../../Tag";
import { GET_TODO_TAGS} from "../../Tag/queries.js"


const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

class ListViewTags extends Component {
  render() {
    const { classes, id } = this.props;
    return (
      <Query query={GET_TODO_TAGS} variables={{ id: id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          let tags = data.todoById.getTags.nodes;
          return (
            <div className={classes.container}>
              {tags.map(tag => (
                <Tag title={tag.name} key={tag.id} color={tag.color} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

ListViewTags.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(ListViewTags);
