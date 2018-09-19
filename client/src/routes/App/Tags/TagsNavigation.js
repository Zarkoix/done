import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import produce from "immer";

const styles = theme => ({
  root: {}
});

class TagsNavigation extends Component {
  constructor() {
    super();
    this.state = {
      tags: {
        red: true,
        orange: false,
        yellow: false,
        green: false,
        blue: false
      }
    };
  }

  handleListItemClick = key => {
    this.setState(
      produce(this.state, draftState => {
        draftState.tags[key] = !draftState.tags[key];
        return draftState;
      })
    );
  };

  render() {
    return (
      <List component="nav">
        {Object.entries(this.state.tags).map(([name, selected]) => (
          <ListItem
            button
            key={name}
            selected={selected}
            onClick={() => this.handleListItemClick(name)}
          >
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(TagsNavigation);
