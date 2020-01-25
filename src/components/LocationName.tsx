import React, { useState, useEffect } from "react"
import { Theme, makeStyles, Typography } from "@material-ui/core"
import axios from "axios";

export const useStyles = makeStyles((theme: Theme) => ({
  name: {
    marginTop: theme.spacing(1)
  },
}))

interface Position {latitude:number, longitude:number}
interface LocationData {distance:number, title:string}

export const LocationName = (position:Position) => {

  const classes = useStyles()

  const [locationName, setLocationName] = useState<string>("Locating...")

  useEffect(() => { 
    if(position.latitude !== undefined) refreshLocationName()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position])

  const refreshLocationName = async () => {
    await axios
      .get<LocationData[]>(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${position.latitude},${position.longitude}`
      )
      .then(response => {
        setLocationName(
          response.data === undefined || response.data.length === 0 || response.data[0].distance > 50000
          ? "Far From Anywhere"
          : response.data[0].title)
      })
      .catch(() => setLocationName("Error..."))
  }

  return <Typography className={classes.name} variant={locationName.length > 10 ? "h5" : "h4"}>
    {locationName}
  </Typography>
}
