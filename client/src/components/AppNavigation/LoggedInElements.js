import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";

import { ApolloConsumer } from "react-apollo";

import { logout } from "../../auth.js";

const styles = theme => ({
  gutterRight: {
    marginRight: theme.spacing.unit + "px"
  }
});

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
    const { classes } = this.props;

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
            <div className={classes.gutterRight} />
          </React.Fragment>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(withStyles(styles)(LoggedInElements));
