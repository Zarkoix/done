import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({
  tag: {
    display: "inline-block",
    lineHeight: "24px",
    backgroundColor: theme.palette.background.default,
    margin: "0 4px 0 0",
    borderRadius: "16px",
    color: "inherit",
    textDecoration: "none",
    height: theme.spacing.unit * 3,
    width: theme.spacing.unit * 3,
    whiteSpace: "nowrap"
  },
  tagActionBtn: {
    display: "block",
    opacity: "0.4",
    backgroundColor: theme.palette.background.paper,
    backgroundBlendMode: "darken",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    lineHeight: "20px",
    textAlign: "center",
    margin: "2px",
    marginLeft: "2px",
    transition: "transform 0s, opacity 0.1s",
    "&:hover": {
      opacity: "1"
    }
  },
  tagActionIcon: {
    opacity: "1",
    height: "20px",
    width: "20px"
  }
});

class IconTag extends Component {
  handleIconClick = e => {
    e.stopPropagation();
    this.props.onClick(e);
  };

  render() {
    const { classes, color, ActionIcon, onClick } = this.props;
    return (
      <ButtonBase
        className={classes.tag}
        style={color ? { backgroundColor: color } : {}}
        onClick={this.handleIconClick}
      >
        <span className={classes.tagActionBtn}>
          <ActionIcon
            color="action"
            className={classes.tagActionIcon}
          />
        </span>
      </ButtonBase>
    );
  }
}

IconTag.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  ActionIcon: PropTypes.func
};

export default withStyles(styles)(IconTag);
