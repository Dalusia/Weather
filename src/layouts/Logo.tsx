import { Theme, makeStyles } from "@material-ui/core"
import React, { useState } from 'react';
import useInterval from "../utils/useInterval";

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    logo: { width: 50*256/228, height: 50, position: "relative", zIndex: 1, },
    sun: { position: "absolute", width: 50*256/228, height: 50, left: 0, top: 0, zIndex: 2, },
    color: { position: "absolute", width: 50*256/228, height: 50, left: 0, top: 0, zIndex: 3, },
    brolly: { position: "absolute", width: 50*256/228, height: 50, left: 0, top: 0, zIndex: 4, },
}))

const Hue = () => new Date().getSeconds()*6

const Logo : () => any = () => {
    const classes = useStyles({})
    const [hue, setHue] = useState<number>(Hue())
    useInterval(() => setHue(Hue()), 60000/360)

return <div className={classes.logo}>
        <img alt="Logo" src="/sun.png" className={classes.sun} />
        <img alt="Logo" src="/b1.png" className={classes.color} style={{filter: `hue-rotate(${hue}deg)`}} />
        <img alt="Logo" src="/b2.png" className={classes.color} style={{filter: `hue-rotate(${(hue+120)%360}deg)`}} />
        <img alt="Logo" src="/b3.png" className={classes.color} style={{filter: `hue-rotate(${(hue+240)%360}deg)`}} />
        <img alt="Logo" src="/brolly.png" className={classes.brolly} style={{filter: `hue-rotate(${hue}deg)`}} />
    </div>
}

export default Logo