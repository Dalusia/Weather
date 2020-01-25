import React, { useState, useEffect } from "react"
import { usePosition } from "use-position"
import { Avatar, Theme, makeStyles } from "@material-ui/core"; 

export const useStyles = makeStyles((theme: Theme) => ({
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
  }));

const imageCache = {}

export const Map: () => any = () => {

  const [defaultZoom,minZoom,maxZoom] = [4,0,14]
  const [zoom,setZoom] = useState<number>(defaultZoom)

  const { latitude, longitude } = usePosition(true);
  const geo = latitude + "," + longitude;
  const pin = `locations=${geo}&size=@1x&defaultMarker=via-red`;
  const key = 'lLPhHetyJqHgT3uB14eb2TABLeYaNOtD';
  const queryString = `center=${geo}&key=${key}&size=207,207&${pin}`;
  const mapUrl = (zoom:number) => `https://open.mapquestapi.com/staticmap/v5/map?${queryString}&zoom=${zoom}`;
  const locationName = "???"; // Get this from context once geolocation moved
  const classes = useStyles();
  const newImage = (url:string) => { const image = new Image(); image.src = url; return image; }

  const range = (start:number, end:number) => Array.from({ length: (end - start + 1) }, (_, i) => start + i);

  useEffect(() =>{
    if(latitude !== undefined) 
      [zoom, ...range(minZoom, zoom-1),...range(zoom+1, maxZoom)]
        .forEach(i => imageCache[mapUrl(i)] = newImage(mapUrl(i)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude])

  const zoomIn  = () => {if(zoom<maxZoom) setZoom(zoom+1)}
  const zoomOut = () => {if(zoom>minZoom) setZoom(zoom-1)}

  return <Avatar 
      alt={locationName} 
      className={classes.avatar} 
      src={mapUrl(zoom)} 
      onClick={zoomIn}
      onContextMenu={(e) => {
        e.preventDefault(); 
        zoomOut()
      }}
      onWheel={(e) =>{
        if(e.deltaY < 0) zoomIn()
        else if(e.deltaY > 0) zoomOut()
        console.log(JSON.stringify(e.deltaY)) 
      }}
    />;
};
