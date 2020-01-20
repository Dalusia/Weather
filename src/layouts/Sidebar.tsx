import React from "react";
import clsx from "clsx";
import { Divider, Drawer, Theme, Hidden, Switch, makeStyles } from "@material-ui/core";
import Cloud from "@material-ui/icons/Cloud";
import { WbSunny, Brightness3 } from "@material-ui/icons";
import { Profile, SidebarNav } from ".";
import { ThemeContext } from "../Context";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("md")]: {
      marginTop: 64,
      height: "calc(100% - 64px)"
    }
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2)
  },
  darkModeToggle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  flexGrow: {
    flexGrow: 1
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar: (props: {
  open: boolean;
  variant: any;
  onClose: any;
  className?: any;
}) => any = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles({});

  const pages = [
    {
      title: "Home",
      href: "/home",
      icon: <Cloud />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
        <div className={classes.flexGrow} />
        <Hidden mdUp>
          <div className={classes.darkModeToggle}>
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
          </div>
        </Hidden>
      </div>
    </Drawer>
  );
};

export default Sidebar;
