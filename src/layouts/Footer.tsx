import React from "react";
import clsx from "clsx";
import { Typography, Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(3)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{" "}
        <Link component="a" href="" target="_blank">
          Dalusia.com
        </Link>
        . 2019
      </Typography>
      <Typography variant="caption" />
    </div>
  );
};

export default Footer;
