// import React, { Component } from "react";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  headline: {
    lineHeight: "48px",
    fontSize: "1.5rem",
    display: "inline",
    flexGrow: 1,
    whiteSpace: "nowrap",
    cursor: "pointer"
  },
  noHeadline: {
    opacity: "0.8",
    color: "grey"
  }
};

const ListViewHeadline = ({ text, classes }) => {
  return (
    <Typography
      variant="headline"
      className={classNames({
        [classes.headline]: true,
        [classes.noHeadline]: !Boolean(text)
      })}
    >
      {text ? text : "Untitled To-Do"}
    </Typography>
  );
};

ListViewHeadline.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListViewHeadline);
