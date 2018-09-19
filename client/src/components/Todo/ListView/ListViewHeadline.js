// import React, { Component } from "react";
import React from "react";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

const styles = {
  headline: {
    lineHeight: "48px",
    display: "inline",
    flexGrow: 1,
    whiteSpace: "nowrap"
  }
}

const ListViewHeadline = withStyles(styles)(({ text, classes }) => {
  return (
    <Typography variant="headline" className={classes.headline} >
      { text }
    </Typography>
  );
});

ListViewHeadline.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default ListViewHeadline;
