import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { withRouter } from 'react-router-dom';

import { Mutation } from "react-apollo";

import { GET_JWT, jwtToCache, AUTHENTICATE } from "../../auth.js";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Mutation
        mutation={AUTHENTICATE}
        update={(cache, { data: { authenticate } }) => {
          cache.writeQuery({
            query: GET_JWT,
            data: { JWT: authenticate.jwtToken }
          });
        }}
      >
        {(authenticate, { data, loading, error }) => (
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography variant="headline">Login</Typography>
                <form
                  className={classes.form}
                  onSubmit={async e => {
                    e.preventDefault();
                    let { data } = await authenticate({
                      variables: {
                        email: this.state.email,
                        password: this.state.password
                      }
                    });
                    if (data.authenticate.jwtToken !== null) {
                      jwtToCache(data.authenticate.jwtToken)
                      this.props.history.push('/');
                    } else {
                      // TODO: throw error
                    }
                  }}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                      id="email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={event =>
                        this.setState({ email: event.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={event =>
                        this.setState({ password: event.target.value })
                      }
                    />
                  </FormControl>
                  <Button
                    fullWidth
                    variant="raised"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              </Paper>
              {loading && <p>Loading...</p>}
              {error && <p>Error :( Please try again</p>}
            </main>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));
