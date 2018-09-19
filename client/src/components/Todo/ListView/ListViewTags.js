import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Tag from "../../Tag";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

class ListViewTags extends Component {
  constructor(props) {
    super();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Tag title="Red" color="#ffb3ba" />
        <Tag title="Orange" color="#ffdfba" />
        <Tag title="+3 more" color="#d8d8d8" />
      </div>
    );
  }
}

ListViewTags.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(ListViewTags);
