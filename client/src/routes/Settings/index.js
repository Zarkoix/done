import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { isDarkTheme, setDarkTheme } from "../../theme.js";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      darkMode: isDarkTheme()
    };
  }

  handleDarkModeToggle = e => {
    setDarkTheme(!this.state.darkMode);
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Typography variant="display2">Settings</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.darkMode}
              onChange={this.handleDarkModeToggle}
              value="darkModeSwitch"
            />
          }
          label="Dark Theme (changing this will refresh the page)"
        />
      </div>
    );
  }
}

export default Settings;
