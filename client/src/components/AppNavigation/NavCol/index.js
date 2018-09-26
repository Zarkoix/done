import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import TodayIcon from "@material-ui/icons/Today";
import LabelIcon from "@material-ui/icons/Label";
import InboxIcon from "@material-ui/icons/Inbox";
import CalendarIcon from "@material-ui/icons/CalendarViewDay";
import ProjectsIcon from "@material-ui/icons/Dashboard";

import SettingsListItem from "./SettingsListItem.js";

const styles = theme => ({
  list: {
    height: "100%",
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: theme.palette.background.default,
    borderRight: "1px solid " + theme.palette.divider,
    display: "flex",
    flexDirection: "column"
  },
  spacer: {
    flexGrow: 1
  }
});

const routes = {
  Today: {
    icon: <TodayIcon />,
    disabled: false
  },
  Inbox: {
    icon: <InboxIcon />,
    disabled: false
  },
  Upcoming: {
    icon: <CalendarIcon />,
    disabled: true
  },
  Projects: {
    icon: <ProjectsIcon />,
    disabled: true
  },
  Tags: {
    icon: <LabelIcon />,
    disabled: false
  }
};

class NavCol extends Component {
  constructor() {
    super();
    this.state = {
      selected: "today"
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <List className={classes.list}>
        {Object.keys(routes).map(e => (
          <ListItem
            button
            disabled={routes[e].disabled}
            component={Link}
            to={"/" + e}
            key={e}
            selected={this.props.location.pathname === "/" + e}
          >
            <ListItemIcon>{routes[e].icon}</ListItemIcon>
            <ListItemText primary={e} />
          </ListItem>
        ))}
        <div className={classes.spacer} />
        <SettingsListItem />
      </List>
    );
  }
}

export default withRouter(withStyles(styles)(NavCol));
