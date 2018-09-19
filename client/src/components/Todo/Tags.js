import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Tag from "../Tag";

const styles = theme => ({

});

class Tags extends Component {
  constructor(props) {
    super();
  }

  render() {
    // const { classes } = this.props;
    return (
      <React.Fragment>
        <Tag title="Red" color="#ffb3ba" />
        <Tag title="Orange" color="#ffdfba" />
        <Tag title="+3 more" color="#d8d8d8" />
      </React.Fragment>
    );
  }
}

Tags.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tags);
