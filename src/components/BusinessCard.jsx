import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Container, Avatar } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { categories } from "../ListOfCategories";
import { textTruncate } from "../utils/truncateText";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px auto 0px`,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: "2px 2px 6px #888888",
    borderRadius: "5px",
    maxWidth: "444px",
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1, 2),
      // width: `calc(100% - ${theme.spacing(2)}px)`,
    },
  },
  button: {
    width: "auto !important",
  },
  tagsDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  businessName: {
    textTransform: "uppercase",
    fontWeight: "normal",
    marginLeft: theme.spacing(1),
  },
}));

const BusinessCard = ({ mini, ...props }) => {
  const classes = useStyles();
  const {
    business_name,
    business_location,
    logo_url,
    sample_images,
    category,
    business_description,
    tags,
    business_url,
    email,
    owner_name,
  } = props.dbObject;
  const images = sample_images.split(",");
  return (
    <div
      className={classes.root}
      style={{ cursor: mini && "pointer" }}
      onClick={mini && props.handleClick}
    >
      <div
        className="business-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar alt="Business Logo" src={logo_url} variant="square">
          {business_name.charAt(0)}
        </Avatar>
        <Typography variant="h6" className={classes.businessName}>
          {business_name}
        </Typography>
      </div>

      {/* <br></br> */}
      <Typography variant="body1" style={{ fontWeight: "bold" }}>
        CATEGORY: {category}
      </Typography>
      <Typography variant="body2">
        {mini ? textTruncate(business_description || "") : business_description}
      </Typography>
      <br></br>
      <Typography variant="body1">LOCATION: {business_location}</Typography>
      {!mini && (
        <>
          {images.length !== 0 && images[0].length !== 0 && (
            <Carousel dynamicHeight={true}>
              {images.map((img, index) => (
                <img
                  key={index}
                  className="business-image"
                  src={img}
                  alt="business-image"
                />
              ))}
            </Carousel>
          )}

          <div className="button-group">
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              <a href={`mailto:${email}`}>Contact</a>
            </Button>
            {business_url && (
              <Button
                color="primary"
                variant="outlined"
                className={classes.button}
              >
                <a href={`http://${business_url}`} target="__blank">
                  Business Site
                </a>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessCard;
