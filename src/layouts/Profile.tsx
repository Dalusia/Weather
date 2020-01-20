import React from "react";
import clsx from "clsx";
import { Avatar, Typography, Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 0,
    filter: "invert(60%)"
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile: (props: { className?: any }) => any = props => {
  const { className, ...rest } = props;

  const classes = useStyles({});

  const user = {
    name: "foo",
    avatar: "https://www.fnordware.com/superpng/pnggrad8rgb.jpg",
    bio: "X"
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar alt={user.name} className={classes.avatar} src={user.avatar} />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

export default Profile;
