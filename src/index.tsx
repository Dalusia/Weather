import * as React from 'react';
import { render } from 'react-dom';
//import React from "react";
//import { render } from "react-dom";

import "./styles.css";
import App from "./App";

//const rootElement = document.getElementById("root");
//render(<App />, rootElement);

render(<App />, document.getElementById('root'));
/*
  Note to self: 
    fix useStyles({}), 
    the {} shouldn't be necessary after bug in typescript gets fixed! 
*/