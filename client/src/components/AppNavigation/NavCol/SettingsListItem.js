import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { ApolloConsumer } from "react-apollo";

import { logout } from "../../../auth.js";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";

class SettingsListItem extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    console.log("handle menu called");
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.setState({ anchorEl: null });
  };

  handleLogOut = client => {
    // close menu
    this.setState({ anchorEl: null });

    // clear localStorage
    logout();

    // clear local state
    client.resetStore();

    // force refresh the page
    this.props.history.push("/");
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <ApolloConsumer>
        {client => (
          <React.Fragment>
            <ListItem button onClick={this.handleMenu}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem
                component={Link}
                to="/Settings"
                onClick={this.handleClose}
              >
                Settings
              </MenuItem>
              <MenuItem onClick={() => this.handleLogOut(client)}>
                Log Out
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(SettingsListItem);
