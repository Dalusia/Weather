import React, { useState, useEffect } from "react"
import { Avatar, Theme, makeStyles } from "@material-ui/core"

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
  }))

const imageCache = {}

interface Position {latitude:number, longitude:number}

const mapUrl = (position:Position, zoom:number) => {
  const hasPosition : ()=>boolean = () => position.latitude !== undefined
  const geo = hasPosition() ? position.latitude + "," + position.longitude : "30,0"
  const pin = hasPosition() ? `&locations=${geo}&size=@1x&defaultMarker=via-red` : ''
  const key = 'lLPhHetyJqHgT3uB14eb2TABLeYaNOtD'
  const queryString = `center=${geo}&key=${key}&size=207,207${pin}&zoom=${hasPosition() ? zoom : 0}`
  return `https://open.mapquestapi.com/staticmap/v5/map?${queryString}`
}

export const Map = (position:Position) => {

  const [defaultZoom,minZoom, maxZoom] = [4,0,14]
  const [zoom, setZoom] = useState<number>(defaultZoom)

  const classes = useStyles()
  const newImage = (url:string) => { const image = new Image(); image.src = url; return image; }

  const range = (start:number, end:number) => Array.from({ length: (end - start + 1) }, (_, i) => start + i)

  useEffect(() =>{
    if(position.latitude !== undefined) 
      [zoom, ...range(minZoom, zoom-1),...range(zoom+1, maxZoom)]
        .forEach(i => imageCache[mapUrl(position, i)] = newImage(mapUrl(position, i)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position])

  const zoomIn  = () => {if(zoom<maxZoom) setZoom(zoom+1)}
  const zoomOut = () => {if(zoom>minZoom) setZoom(zoom-1)}

  return <Avatar 
      alt={"Map"}
      className={classes.avatar} 
      src={mapUrl(position, zoom)} 
      onClick={zoomIn}
      onContextMenu={(e) => {
        e.preventDefault()
        zoomOut()
      }}
      onWheel={(e) =>{
        if(e.deltaY < 0) zoomIn()
        else if(e.deltaY > 0) zoomOut()
      }}
    />
}