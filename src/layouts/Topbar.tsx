import React from "react"
import { Link as RouterLink } from "react-router-dom"
import clsx from "clsx"
import { AppBar, Toolbar, Hidden, IconButton, Typography, Switch, Theme, makeStyles } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { WbSunny, Brightness3 } from "@material-ui/icons"
import { Logo } from "."
import { ThemeContext } from "../Context"

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    boxShadow: "none"
  },
  flexGrow: {
    paddingLeft: theme.spacing(2),
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}))

const Topbar: React.FC<any> = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const classes = useStyles({});

  return (
    <AppBar
      {...rest}
      color="secondary"
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Typography variant="h5" className={classes.flexGrow}>
          Weather
        </Typography>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <Brightness3 />
          <ThemeContext.Consumer>
            {context => (
              <Switch
                checked={!context.darkMode}
                onChange={() => context.setDarkMode(!context.darkMode)}
                value="checkedA"
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            )}
          </ThemeContext.Consumer>
          <WbSunny />
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar