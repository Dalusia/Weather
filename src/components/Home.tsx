import React, { useState, useEffect } from "react";
import {
  Theme,
  TableCell,
  Paper,
  Table,
  TableBody,
  TableRow,
  makeStyles,
  createStyles,
  TableHead
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowX: "auto",
      margin: theme.spacing(2)
    },
    table: {
      minWidth: 600,
      justify: "center",
      position: "relative",
      borderSpacing: 0,
      width: "100%"
    },
    tableCell: {
      //padding: '12px 0px 12px 24px',
      textAlign: "right",
      justifyContent: "right"
    },
    more: {
      marginRight: theme.spacing(2),
      color: "white",
      backgroundColor: blue[500],
      "&:hover": { backgroundColor: blue[700] }
    },
    weatherIcon: {
      width: 32,
      height: 32
    },
    windArrow: {
      width: 24,
      height: 24,
      filter: "invert(75%)"
    },
    unitAndValue: {
      lineHeight: "20px"
    },
    unit: {
      color: theme.palette.primary.main,
      fontSize: "smaller"
    }
  })
);

export interface Weather {
  id: any;
  weather_state_name: string;
  weather_state_abbr: string;
  wind_direction_compass: string;
  created: Date;
  applicable_date: Date;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  wind_speed: number;
  wind_direction: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}

const isToday: (date: Date) => boolean = date => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const dayName: (date: Date) => string = date =>
  isToday(date) ? "Today" : weekdays[date.getDay()];

const ValueWithUnit: React.FC<{ value: number; unit: string }> = ({
  value,
  unit
}) => {
  const classes = useStyles();

  return (
    <div className={classes.unitAndValue}>
      {Math.round(value)}
      <span className={classes.unit}>&#8239;{unit}</span>
    </div>
  );
};

const Home: React.FC = () => {
  const classes = useStyles();

  const [forecast, setForecast] = useState<Weather[]>();
  
  useEffect(() => { 
    refreshForecast() 
  }, []);

  const refreshForecast = async () => {
    await axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/44418/"
      )
      .then(response => {
        setForecast(response.data.consolidated_weather);
      });
    //.catch(_ => setForecast())
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} style={{ borderSpacing: 0 }}>
        <colgroup />
        <TableHead>
          <TableRow>
            <TableCell align="right">Day</TableCell>
            <TableCell align="right">Weather</TableCell>
            <TableCell align="right">Temp.</TableCell>
            <TableCell align="right">Wind</TableCell>
            <TableCell align="right">Pressure</TableCell>
            <TableCell align="right">Humidity</TableCell>
            <TableCell align="right">Visibility</TableCell>
            <TableCell align="right" style={{paddingRight: 48}}>Pred.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forecast &&
            forecast.map((x: Weather) => (
              <TableRow key={x.id}>
                <TableCell className={classes.tableCell}>
                  {dayName(new Date(x.applicable_date))}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <img
                    className={classes.weatherIcon}
                    src={`https://www.metaweather.com/static/img/weather/${x.weather_state_abbr}.svg`}
                    alt={x.weather_state_name}
                  />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <ValueWithUnit value={x.the_temp} unit="°C" />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img
                      className={classes.windArrow}
                      src="/arrow.png"
                      alt={x.wind_direction_compass}
                      style={{ transform: `rotate(${x.wind_direction}deg)` }}
                    />
                    &nbsp;&nbsp;
                    <ValueWithUnit value={x.wind_speed} unit="mph" />
                  </div>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <ValueWithUnit value={x.air_pressure} unit="mbar" />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <ValueWithUnit value={x.humidity} unit="%" />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <ValueWithUnit value={x.visibility} unit="miles" />
                </TableCell>
                <TableCell className={classes.tableCell} style={{paddingRight: 48}}>
                  <ValueWithUnit value={x.predictability} unit="%" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
  //<TableCell className={classes.tableCell}>{x.id}</TableCell>                     */}
  //<TableCell className={classes.tableCell}>{x.weather_state_abbr}</TableCell>     */}
};

export default Home;
