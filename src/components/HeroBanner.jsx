import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Barber from "../assets/images/clippers-no-bg.png";
import Microphone from "../assets/images/microphone-transparent.png";
import Threads from "../assets/images/threads-no-bg.png";
import MakeUp from "../assets/images/makeup-no-bg.png";
import SearchFilter from "./SearchFilter";
import Hair from "../assets/images/black_woman_hair.png";
import Catering from "../assets/images/catering-bg.png";

const useStyles = makeStyles((theme) => ({}));

const colorImageArray = [
  // { color: "#51a0ae", image: Threads },#ff66c4
  { color: "#ff914d", image: Hair },
  { color: "#e91e63", image: MakeUp },
  { color: "#fed420", image: Catering },
  { color: "#fed11a", image: Microphone },
  { color: "#51a0ae", image: Threads },
];

const HeroBanner = () => {
  const classes = useStyles();
  const [bgColor, setBgColor] = useState(colorImageArray[0].color);
  const [sideImg, setSideImg] = useState(colorImageArray[0].image);

  useEffect(() => {
    var i = 0;
    const interval = setInterval(() => {
      setBgColor(colorImageArray[i].color);
      setSideImg(colorImageArray[i].image);
      i++;
      if (i == colorImageArray.length) {
        i = 0;
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="hero" style={{ backgroundColor: bgColor }}>
      <div className="hero-side-image">
        <img src={sideImg} />
      </div>
      <section className="hero-text-overlay">
        <Typography variant="h4" style={{ fontWeight: "700" }}>
          Find the perfect black-owned business for your needs.
        </Typography>
        <SearchFilter />
      </section>
    </header>
  );
};

export default HeroBanner;
