import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { ApolloConsumer } from "react-apollo";

import { jwtClearCache } from '../../auth.js'

class LoggedInElements extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.setState({ anchorEl: null });
  };

  handleLogOut = (client) => {
    // close menu
    this.setState({ anchorEl: null });

    // clear localStorage
    jwtClearCache();

    // clear local state
    client.resetStore();

    // force refresh the page
    document.location.reload(true);
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <ApolloConsumer>
        {client => (
          <React.Fragment>
            <IconButton
              aria-owns={open ? "menu-appbar" : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
              <MenuItem onClick={() => this.handleLogOut(client)}>Log Out</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </ApolloConsumer>
    );
  }
}

export default LoggedInElements;
