import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import IconButton from "@material-ui/core/IconButton";
import UpArrow from "@material-ui/icons/KeyboardArrowUp";

import clearHighlights from "../clearHighlights.js";

import CompletionCheckbox from "../ListView/CompletionCheckbox";
import ExpandedViewHeadline from "./ExpandedViewHeadline.js";
import Notes from "./Notes.js";
import ExpandedViewTags from "./ExpandedViewTags";
import RightGutterMenu from "./RightGutterMenu";

const GET_TODO_COMPLETE_DATA = gql`
  query getCompleteTodoData($id: Int!) {
    todoById(id: $id) {
      id
      completed
      body
      headline
      doWhenDate
      doWhenTime
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row"
  },
  main: {
    width: '100%'
  },
  body: {
    padding: theme.spacing.unit + "px",
    paddingTop: 0
  },
  topbar: {
    display: "flex"
  },
  rightGutter: {
    display: "flex",
    flexDirection: "column"
  },
  spacer: {
    flexGrow: 1
  }
});

class ExpandedContent extends Component {
  componentDidMount() {
    clearHighlights();
  }

  render() {
    const { classes, onClose } = this.props;
    return (
      <Query query={GET_TODO_COMPLETE_DATA} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          let { body, headline, completed } = data.todoById;
          return (
            <div className={classes.container}>
              <div className={classes.main}>
                <div className={classes.topbar}>
                  <CompletionCheckbox id={this.props.id} completed={completed} />
                  <ExpandedViewHeadline id={this.props.id} text={headline} />
                </div>
                <div className={classes.body}>
                  <Notes id={this.props.id} text={body} />
                  <ExpandedViewTags id={this.props.id} />
                </div>
              </div>
              <div className={classes.rightGutter}>
                {onClose && (
                  <IconButton
                    className={classes.button}
                    aria-label="minimize"
                    onClick={onClose}
                  >
                    <UpArrow />
                  </IconButton>
                )}
                <div className={classes.spacer} />
                <RightGutterMenu id={this.props.id} />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

ExpandedContent.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func
};

export default withStyles(styles)(ExpandedContent);
