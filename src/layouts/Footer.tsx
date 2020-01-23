import React from "react";
import clsx from "clsx";
import { Typography, Link, makeStyles, Hidden } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    lineHeight: "25px",
    [theme.breakpoints.up('md')] : {
      display: "flex",
    },
  },
  flexGrow: {
    paddingLeft: theme.spacing(2),
    flexGrow: 1,
  },
  credits: {
    opacity: 0.75,
    fontSize: "smaller",
  }
}));

const Footer = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;&nbsp;Joe Simpson,{" "}
        <Link component="a" href="" target="_blank">Dalusia.com</Link>
        . {new Date().getFullYear()}
      </Typography>
      <Hidden smDown>
        <div className={classes.flexGrow} />
      </Hidden>
      <span className={classes.credits}>
        Credits to {" "}
        <Link component="a" href="https://www.metaweather.com/" target="_blank">MetaWeather</Link>
        {" "} for weather data, and {" "}
        <Link component="a" href="https://www.mapquest.com/" target="_blank">MapQuest</Link>
        {" "} for maps.
      </span>
    </div>
  );
};

export default Footer;
