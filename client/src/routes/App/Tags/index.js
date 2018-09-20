import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import produce from "immer";

import Slide from "@material-ui/core/Slide";

import Todo from "../../../components/Todo";
import NewTodoButton from "./NewTodoButton.js";
import TagsNavigation from "./TagsNavigation";

import { GET_ALL_TODOS } from "../../../queries";

const styles = theme => ({
  layout: {
    display: "flex",
    flexDirection: "row",
    height: "100%"
  },
  titleText: {
    marginBottom: theme.spacing.unit + "px"
  },
  content: {
    padding: theme.spacing.unit / 2,
    flexGrow: 1
  }
});

class Tags extends Component {
  constructor() {
    super();
    this.state = {
      selectedTags: new Set()
    };
  }

  handleTagClick = id => {
    if (this.state.selectedTags.has(id)) {
      this.setState(
        produce(this.state, draftState => {
          draftState.selectedTags.delete(id);
        })
      );
    } else {
      this.setState(
        produce(this.state, draftState => {
          draftState.selectedTags.add(id);
        })
      );
    }
  };

  handleTagDoubleClick = id => {
    this.setState({
      selectedTags: new Set([id])
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.layout}>
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <TagsNavigation
            onTagClick={this.handleTagClick}
            onTagDoubleClick={this.handleTagDoubleClick}
            selected={this.state.selectedTags}
          />
        </Slide>
        <div className={classes.content}>
          <Query query={GET_ALL_TODOS}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return `Error!: ${error}`;
              return data.allTodos.nodes.map((data, i) => (
                <Todo key={i} id={data.id} />
              ));
            }}
          </Query>
          <NewTodoButton />
        </div>
      </div>
    );
  }
}

Tags.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tags);
