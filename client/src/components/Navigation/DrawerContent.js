import React, { Component } from "react";
import { withRouter } from 'react-router';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import TodayIcon from "@material-ui/icons/Today";
import LabelIcon from "@material-ui/icons/Label";
import InboxIcon from "@material-ui/icons/Inbox";
import CalendarIcon from "@material-ui/icons/CalendarViewDay";

class DrawerContent extends Component {
  constructor() {
    super();
    this.state = {
      selected: "today"
    };
  }

  render() {
    console.log(this.props.location)
    return (
      <List>
        <ListItem button selected={this.props.location.pathname === "/Today"}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Today" />
        </ListItem>
        <ListItem button selected={this.state.selected === "/Inbox"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button selected={this.state.selected === "/Upcoming"}>
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText primary="Upcoming" />
        </ListItem>
        <ListItem button selected={this.state.selected === "/Tags"}>
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText primary="Tags" />
        </ListItem>
      </List>
    );
  }
}

export default withRouter(DrawerContent);
