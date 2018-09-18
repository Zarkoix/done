import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    background: theme.palette.background.default,
    height: "100%",
    overflowX: "hidden",
    position: "relative"
  },
  header: {
    height: "auto",
    position: "relative"
  },
  slant: {
    zIndex: 1,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    background: theme.palette.primary.main,
    // transform: "skewY(-12deg)",
    transformOrigin: 0
  },
  toolbar: {
    display: "flex",
    flexDirection: "row"
  },
  spacer: {
    flexGrow: 1
  },
  hero: {
    zIndex: 2,
    position: "relative",
    boxShadow: "0 2px 8px 0 rgba(0,0,0,.25)"
  },
  intro: {
    color: "white",
    padding: theme.spacing.unit * 2 + "px " + theme.spacing.unit * 3 + "px",
    paddingBottom: theme.spacing.unit * 8
  },
  headline: {
    marginBottom: theme.spacing.unit * 3
  },
  description: {
    maxWidth: "400px",
    marginBottom: theme.spacing.unit * 3,
    lineHeight: "2em"
  },
  button: {
    margin: theme.spacing.unit
  },
  main: {
    position: "relative",
    zIndex: 3
  },
  buildNoticePaper: {
    maxWidth: "50%",
    margin: "16px",
    padding: "8px"
  },
  buildNoticeText: {},
  render: {
    // transform: "translateY(-40%) translateX(40%)",
    position: "absolute",
    zIndex: 4,
    top: "15%",
    left: "50%",
    height: "500px",
    width: "auto"
  }
});

export default withStyles(styles)(props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.slant} />
        <div className={classes.hero}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="title" color="inherit" noWrap>
              Done
            </Typography>
            <div className={classes.spacer} />
            <Button
              variant="outlined"
              color="inherit"
              className={classes.button}
              component={Link}
              to={"Signup"}
            >
              Signup
            </Button>
            <Button className={classes.button} component={Link} to={"Login"}>
              Log in
            </Button>{" "}
          </Toolbar>
          <div className={classes.intro}>
            <Typography
              classes={{ root: classes.headline }}
              color="textPrimary"
              variant="display1"
            >
              The <b>new</b> way to get stuff done
            </Typography>
            <Typography
              classes={{ root: classes.description }}
              color="textPrimary"
              variant="body1"
            >
              Our goal is to help you be say <b>"done"</b> more often. We'll
              handle your todos so you can focus on doing them.
            </Typography>
            <Button
              variant="raised"
              color="secondary"
              className={classes.button}
              component={Link}
              to={"Signup"}
            >
              Create Account
            </Button>
          </div>
        </div>
      </header>
      <img className={classes.render} src="/splashRender.png" alt="UX Render" />
      <main className={classes.main}>
        <Paper className={classes.buildNoticePaper}>
          <Typography color="textPrimary" variant="headline">
            Pre-Alpha - build 1
          </Typography>
          <Typography
            color="textPrimary"
            variant="body1"
            className={classes.buildNoticeText}
          >
            Passwords are hashed and salted, but I would <b>not</b> recommend
            reusing a password. Data is <b>not</b> encrypted. DO NOT STORE
            sensitive material
          </Typography>
        </Paper>
      </main>
      <footer />
    </div>
  );
});
