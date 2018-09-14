import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    height: '48px',
    margin: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row'
  },
  headline: {
    lineHeight: '48px',
    display: 'inline'
  }
});

class Todo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Checkbox
          checked={false}
        />
        <Typography variant="headline" className={classes.headline}>
          {this.props.data.headline}
        </Typography>
      </Paper>
    );
  }
}

Todo.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withStyles(styles)(Todo);
