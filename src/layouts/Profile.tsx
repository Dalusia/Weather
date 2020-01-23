import React from "react"
import clsx from "clsx"
import { Avatar, Typography, Theme, makeStyles } from "@material-ui/core";
import { usePosition } from "use-position"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
  avatar: {
    width: 207,
    height: 157,
    '& img':{
      width: 207,
      height: 207,
    },
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
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

  const { latitude, longitude, timestamp, accuracy, errorMessage } = usePosition(true)
  const geo = latitude + "," + longitude;
  const pin = `locations=${geo}&size=@1x&defaultMarker=via-red`
  const key = 'lLPhHetyJqHgT3uB14eb2TABLeYaNOtD'
  const queryString = `center=${geo}&key=${key}&size=207,207&zoom=4&${pin}`
  const mapUrl = `https://open.mapquestapi.com/staticmap/v5/map?${queryString}`

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar alt={user.name} className={classes.avatar} src={mapUrl} />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{dateString}</Typography>
      <Typography variant="body2">
        <code>
          latitude: {latitude}<br/>
          longitude: {longitude}<br/>
          timestamp: {timestamp}<br/>
          accuracy: {accuracy && `${accuracy}m`}<br/>
          error: {errorMessage}
        </code>
      </Typography>
    </div>
  );
};

export default Profile;
