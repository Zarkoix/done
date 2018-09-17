import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column"
  },
  content: {}
});

export default withStyles(styles)(props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <Typography variant="display3" component="h3">
          Looks like you're lost
        </Typography>
      </Paper>
    </div>
  );
});
