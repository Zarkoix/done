import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tag from "../../Tag";
import CloseIcon from "@material-ui/icons/Close";
import NewTag from "./NewTag.js"

const styles = theme => ({
  tagsContainer: {
    marginBottom: "8px"
  }
});

class ExpandedViewTags extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.tagsContainer}>
        <Tag title="Red" showAction ActionIcon={CloseIcon} color="#ffb3ba" />
        <Tag title="Orange" showAction ActionIcon={CloseIcon} color="#ffdfba" />
        <Tag title="Yellow" showAction ActionIcon={CloseIcon} color="#ffffba" />
        <Tag title="Green" showAction ActionIcon={CloseIcon} color="#baffc9" />
        <Tag title="Blue" showAction ActionIcon={CloseIcon} color="#bae1ff" />
        <NewTag />
      </div>
    );
  }
}

ExpandedViewTags.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  text: PropTypes.string
};

export default withStyles(styles)(ExpandedViewTags);
