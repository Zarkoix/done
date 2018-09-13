import React from "react";

import Dashboard from "./Dashboard";
import Splash from "./Splash";

import { jwtFromCache } from "../../auth.js";

export default () => (!!jwtFromCache() ? <Dashboard /> : <Splash />);
