import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

import LoggedOutElements from "../../../components/StaticNavigation/LoggedOutElements.js";
import { jwtFromCache } from "../../../auth.js";

import { Link } from "react-router-dom";

// "linear-gradient(150deg,#53f 15%,#05d5ff 70%,#a6ffcb 94%)",
const styles = theme => ({
  root: {
    background: theme.palette.background.default,
    height: "100%"
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
    transform: "skewY(-12deg)",
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
    position: "relative"
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
  render: {
    transform: "translateY(-40%) translateX(40%)",
    float: "right",
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
      <main className={classes.main}>
        <img className={classes.render} src="/splashRender.png" />
      </main>
      <footer />
    </div>
  );
});
