import React from "react";

import { Redirect } from "react-router-dom";

import Splash from "./Splash";

import { jwtFromCache } from "../../auth.js";

export default () => (Boolean(jwtFromCache()) ? <Redirect to="/Today" /> : <Splash />);
