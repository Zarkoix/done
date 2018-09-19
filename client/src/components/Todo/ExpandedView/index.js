import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ExpandedViewHeadline from "./ExpandedViewHeadline.js";
import Notes from "./Notes.js";
import ExpandedViewTags from "./ExpandedViewTags";
import ActionTray from "./ActionTray";

const GET_TODO_COMPLETE_DATA = gql`
  query getCompleteTodoData($id: Int!) {
    todoById(id: $id) {
      id
      body
      headline
      doWhenDate
      doWhenTime
    }
  }
`;

const styles = theme => ({
  content: {},
  body: {
    lineHeight: "14px",
    display: "block"
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
          let { body, headline } = data.todoById;
          return (
            <div className={classes.content}>
              <ExpandedViewHeadline id={this.props.id} text={headline} />
              <Notes id={this.props.id} text={body} />
              <ExpandedViewTags id={this.props.id} />
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
