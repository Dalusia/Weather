import React, { useState } from "react";
import clsx from "clsx";
import { useMediaQuery, Theme, makeStyles, useTheme } from "@material-ui/core";
import { Sidebar, Topbar, Footer } from ".";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%"
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: "100%"
  },
  toolbar: theme.mixins.toolbar
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles({});
  const theme: Theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <div className={classes.toolbar} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Main;
