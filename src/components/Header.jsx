import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import WhiteLogo from "../assets/images/soplugged-brown.png";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, useHistory } from "react-router-dom";
import { Divider, Typography } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    "& > *": {
      margin: theme.spacing(0, 1),
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  logo: {
    width: "40px",
    height: "40px",
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    // target: window ? window() : undefined,
  });

  if (props.home === true) {
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
      color: trigger ? "primary" : "transparent",
    });
  }
  return children;
}

const Header = (props) => {
  const classes = useStyles();
  const { currentUser, signOut } = useAuth();
  let history = useHistory();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleSignOut = () => {
    if (
      window.confirm("Would you like to sign out of your SoPlugged account?")
    ) {
      signOut();
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/search">DIRECTORY</Link>
      </MenuItem>
      {currentUser ? (
        <MenuItem onClick={handleMobileMenuClose}>
          <Link to="/my-business">MY BUSINESS</Link>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMobileMenuClose}>
          <Link to="/join">JOIN</Link>
        </MenuItem>
      )}

      {currentUser && <Divider />}
      {currentUser && <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>}
    </Menu>
  );

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src={WhiteLogo}
                alt="SoPlugged Logo"
                className={classes.logo}
              />
              {/* <Typography variant="h5" style={{ marginLeft: "8px" }}>
                SoPlugged
              </Typography> */}
            </Link>
            <div className={classes.grow}>{/* <SearchFilter /> */}</div>
            <div className={classes.sectionDesktop}>
              <Button color="inherit">
                <Link to="/search">DIRECTORY</Link>
              </Button>
              {currentUser ? (
                <Link to="/my-business">
                  <Button color="inherit">MY BUSINESS</Button>
                </Link>
              ) : (
                <Link to="/join">
                  <Button color="inherit">JOIN</Button>
                </Link>
              )}

              {currentUser && (
                <Button onClick={handleSignOut} color="inherit">
                  Sign Out
                </Button>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
    </>
  );
};

export default Header;
