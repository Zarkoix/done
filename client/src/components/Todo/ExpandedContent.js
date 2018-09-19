import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Body from "./Body.js";
import ActionTray from "./ActionTray";
import Tag from "../Tag";

const GET_TODO_COMPLETE_DATA = gql`
  query getCompleteTodoData($id: Int!) {
    todoById(id: $id) {
      id
      body
      doWhenDate
      doWhenTime
    }
  }
`;

export const SET_COMPLETED = gql`
  mutation setCompleted($id: Int!, $completed: Boolean!) {
    updateTodoById(input: { id: $id, todoPatch: { completed: $completed } }) {
      todo {
        id
        completed
        body
      }
    }
  }
`;

const styles = theme => ({
  content: {},
  body: {
    lineHeight: "14px",
    display: "block"
  },
  tagsContainer: {
    marginBottom: "8px"
  }
});

class ExpandedContent extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  handleFocus = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Query query={GET_TODO_COMPLETE_DATA} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          let { body } = data.todoById;
          return (
            <div className={classes.content}>
              <Body id={this.props.id} text={body} />
              <div className={classes.tagsContainer}>
                <Tag title="Red" color="#ffb3ba" />
                <Tag title="Orange" color="#ffdfba" />
                <Tag title="Yellow" color="#ffffba" />
                <Tag title="Green" color="#baffc9" />
                <Tag title="Blue" color="#bae1ff" />
              </div>
              <ActionTray id={this.props.id} />
            </div>
          );
        }}
      </Query>
    );
  }
}

ExpandedContent.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(ExpandedContent);
