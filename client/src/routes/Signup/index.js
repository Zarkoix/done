import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import { withRouter, Redirect } from "react-router-dom";

import { Mutation } from "react-apollo";

import { REGISTER } from "../../auth.js";

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

function validateEmail(email) {
  return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
}

function validatePassword(password) {
  return password.length > 5;
}

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      email: null,
      emailError: false,
      password: null,
      passwordError: false
    };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  validateData = (email, password) => {
    let newState = {
      emailError: false,
      passwordError: false
    };
    let dataValidFlag = true;
    if (!validateEmail(email)) {
      dataValidFlag = false;
      newState.emailError = "Doesn't seem to be a proper email";
    }
    if (!validatePassword(password)) {
      dataValidFlag = false;
      newState.passwordError = "Must be at least 6 characters";
    }
    this.setState({
      emailError: newState.emailError,
      passwordError: newState.passwordError
    });
    return dataValidFlag;
  };

  render() {
    const { classes } = this.props;

    return (
      <Mutation
        mutation={REGISTER}
        onError={e => {
          if (e.message.includes("user_email_key")) {
            this.setState({
              emailError: "A user with this email already exists"
            });
          }
        }}
      >
        {(register, { data, loading, error }) => {
          if (!error && data) {
            return <Redirect to="/" />;
          } else {
            return (
              <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                  <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="headline">Welcome!</Typography>
                    <form
                      className={classes.form}
                      onSubmit={async e => {
                        e.preventDefault();
                        if (
                          this.validateData(
                            this.state.email,
                            this.state.password
                          )
                        ) {
                          await register({
                            variables: {
                              email: this.state.email,
                              pass: this.state.password
                            }
                          });
                        }
                      }}
                    >
                      <FormControl
                        margin="normal"
                        required
                        fullWidth
                        error={Boolean(this.state.emailError)}
                      >
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
                        {this.state.emailError && (
                          <FormHelperText id="email-error-text">
                            {this.state.emailError}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl
                        margin="normal"
                        required
                        fullWidth
                        error={Boolean(this.state.passwordError)}
                      >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                          name="password"
                          type={this.state.showPassword ? "text" : "password"}
                          id="password"
                          autoComplete="current-password"
                          onChange={event =>
                            this.setState({ password: event.target.value })
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {this.state.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {this.state.passwordError && (
                          <FormHelperText id="password-error-text">
                            {this.state.passwordError}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Button
                        fullWidth
                        variant="raised"
                        color="primary"
                        className={classes.submit}
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </form>
                  </Paper>
                </main>
              </React.Fragment>
            );
          }
        }}
      </Mutation>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignUp));
