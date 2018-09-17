import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative"
  },
  content: {
    padding: "3%",
    margin: "2%",
    marginTop: "20%"
  },
  button: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <Typography variant="display3" component="h3">
          Looks like you're lost
        </Typography>
        <br />
        <Button
          component={Link}
          to={"/"}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Back to safety
        </Button>
        <Button
          onClick={() => {
            alert("Sorry this hasn't been implmented yet");
          }}
          variant="outlined"
          className={classes.button}
        >
          Report a bug
        </Button>
      </Paper>
    </div>
  );
});
