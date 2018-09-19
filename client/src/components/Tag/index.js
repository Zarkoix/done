import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

const styles = theme => ({
  tag: {
    display: "inline-block",
    height: "24px",
    lineHeight: "24px",
    padding: "0px 8px",
    backgroundColor: theme.palette.background.default,
    margin: "0 4px 0 0",
    borderRadius: "16px",
    color: "inherit",
    textDecoration: "none",
    transition: "padding-right 0.2s",
    height: theme.spacing.unit * 3,
    "&:hover": {
      paddingRight: "calc(1em + 14px)"
    }
  },
  tagCloseBtn: {
    opacity: "0.8",
    backgroundColor: theme.palette.background.paper,
    backgroundBlendMode: "darken",
    borderRadius: "50%",
    position: "absolute",
    width: "20px",
    height: "20px",
    lineHeight: "20px",
    textAlign: "center",
    margin: "2px",
    marginLeft: "6px",
    transform: "scale(0)",
    transition: "transform 0s, opacity 0.1s",
    "&:hover": {
      opacity: "1"
    }
  },
  showTagCloseBtn: {
    transform: "scale(1)",
    transition: "transform " + theme.transitions.duration.enteringScreen + "ms"
  },
  tagCloseIcon: {
    opacity: "1",
    height: "20px",
    width: "20px"
  }
});

class Tag extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  render() {
    const { classes, title, color } = this.props;
    return (
      <Link
        to="/"
        className={classes.tag}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        style={color ? { backgroundColor: color } : {}}
      >
        {title}
        <span
          className={classNames(classes.tagCloseBtn, {
            [`${classes.showTagCloseBtn}`]: this.state.hover
          })}
        >
          <CloseIcon color="action" className={classes.tagCloseIcon} />
        </span>
      </Link>
    );
  }
}

Tag.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onMainClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default withStyles(styles)(Tag);
