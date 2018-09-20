import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tag from "../../Tag";

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
        <Tag title="Red" showDelete color="#ffb3ba" />
        <Tag title="Orange" showDelete color="#ffdfba" />
        <Tag title="Yellow" showDelete color="#ffffba" />
        <Tag title="Green" showDelete color="#baffc9" />
        <Tag title="Blue" showDelete color="#bae1ff" />
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
