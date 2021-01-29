import React from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    minHeight: "5vh",
    padding: theme.spacing(2, 0, 1, 0),
    textAlign: "center",
    marginTop: "10vh",
    backgroundColor: theme.palette.primary.main,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Container>
        <Typography variant="body2">
          Copyright&copy; {new Date().getFullYear()}, SoPlugged
        </Typography>
        <div className="footer-links">
          <Typography variant="body1">
            <a href="https://www.soplugged.com/blog" target="__blank">
              BLOG
            </a>
          </Typography>
          <Typography variant="body1">
            <a href="https://www.soplugged.com/faqs" target="__blank">
              FAQs
            </a>
          </Typography>
        </div>
        <div className="footer-links">
          <Typography variant="body2">
            <a href="https://www.soplugged.com/our-story" target="__blank">
              ABOUT US
            </a>
          </Typography>
          <Typography variant="body2">
            <a href="https://www.soplugged.com/privacy-policy" target="__blank">
              PRIVACY & TERMS
            </a>
          </Typography>
          <Typography variant="body2">
            <a href="mailto:hello@soplugged.com">CONTACT US</a>
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
