import React from "react"
import clsx from "clsx"
import { Typography, Theme, makeStyles } from "@material-ui/core";
import { Map } from "./Map";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile: (props: { className?: any }) => any = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: "London",
    avatar: "https://www.fnordware.com/superpng/pnggrad8rgb.jpg",
  };

  const dateString = new Date().toLocaleDateString("en-GB",
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Map />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{dateString}</Typography>
    </div>
  );
};

export default Profile;
