import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import TodayIcon from "@material-ui/icons/Today";
import LabelIcon from "@material-ui/icons/Label";

class DrawerContent extends Component {
  constructor() {
    super();
    this.state = {
      selected: "today"
    };
  }

  render() {
    return (
      <List>
        <ListItem button selected={this.state.selected === 'today'}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Today" />
        </ListItem>
        <ListItem button selected={this.state.selected === 'tags'}>
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText primary="Tags" />
        </ListItem>
      </List>
    );
  }
}

export default DrawerContent;
