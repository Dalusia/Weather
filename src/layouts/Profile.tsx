import React from "react"
import clsx from "clsx"
import { Typography, Theme, makeStyles } from "@material-ui/core";
import { Map } from "../components/Map";
import { ThemeContext } from "../Context";
import { LocationName } from "../components/LocationName";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
}))

const Profile: (props: { className?: any }) => any = props => {
  const { className, ...rest } = props

  const classes = useStyles()

  const dateString = new Date().toLocaleDateString("en-GB",
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <ThemeContext.Consumer>
        {context => (<>
          <Map latitude={context.position.latitude} longitude={context.position.longitude} />
          <LocationName latitude={context.position.latitude} longitude={context.position.longitude} />
          </>)}
      </ThemeContext.Consumer>
      <Typography variant="body2">{dateString}</Typography>
    </div>
  );
};

export default Profile;
