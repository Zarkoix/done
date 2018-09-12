import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { ApolloConsumer } from "react-apollo";

import { jwtToCache, GET_JWT } from '../../auth.js'

class LoggedInElements extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLogOut = (client) => {
    // clear localStorage
    jwtToCache(null);

    // clear local state
    client.writeQuery({ query: GET_JWT, data: { JWT: null } });

    // close menu
    this.setState({ anchorEl: null });
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