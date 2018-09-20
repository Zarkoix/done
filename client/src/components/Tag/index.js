import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({
  tag: {
    display: "inline-block",
    lineHeight: "24px",
    padding: "0px 8px",
    backgroundColor: theme.palette.background.default,
    margin: "0 4px 0 0",
    borderRadius: "16px",
    color: "inherit",
    textDecoration: "none",
    height: theme.spacing.unit * 3,
    whiteSpace: "nowrap"
  },
  tagShowAction: {
    transition: "padding-right 0.2s",
    "&:hover": {
      paddingRight: "calc(1em + 18px)"
    }
  },
  tagActionBtn: {
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
  showTagActionBtn: {
    transform: "scale(1)",
    transition: "transform " + theme.transitions.duration.enteringScreen + "ms"
  },
  tagActionIcon: {
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

  actionClick = (e) => {
    e.stopPropagation();
    this.props.onActionClick();
  }

  mainClick = (e) => {
    e.stopPropagation();
    if (this.props.mainClick) {
      this.props.onMainClick();
    }
  }

  render() {
    const { classes, title, color, showAction = false, ActionIcon } = this.props;
    return (
      <ButtonBase
        className={classNames(classes.tag, {
          [`${classes.tagShowAction}`]: showAction
        })}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        style={color ? { backgroundColor: color } : {}}
        onClick={this.mainClick}
      >
        {title}
        {showAction && (
          <span
            className={classNames(classes.tagActionBtn, {
              [`${classes.showTagActionBtn}`]: this.state.hover
            })}
            onClick={this.actionClick}
          >
            <ActionIcon color="action" className={classes.tagActionIcon} />
          </span>
        )}
      </ButtonBase>
    );
  }
}

Tag.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onMainClick: PropTypes.func,
  onActionClick: PropTypes.func,
  showAction: PropTypes.bool,
  ActionIcon: PropTypes.func
};

export default withStyles(styles)(Tag);
