import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import CategoriesCarousel from "../components/CategoriesCarousel";
import HeroBanner from "../components/HeroBanner";
import Header from "../components/Header";
import BusinessGrid from "../components/BusinessGrid";
import BusinessGridSkeleton from "../components/skeletons/BusinessGridSkeleton";
import { useSearch } from "../contexts/SearchContext";
import { Link } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

const useStyles = makeStyles((theme) => ({
  sectionHead: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  media: {
    height: 140,
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [fetching, setFetching] = useState(true);
  const { businessList, setBusinessList } = useSearch();

  const getBusinesses = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_ALL_BUSINESSES);
      const resJson = await res.json();
      setBusinessList(resJson);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setFetching(false);
    }
  };
  useEffect(() => {
    if (businessList.length === 0) {
      getBusinesses();
    } else {
      setFetching(false);
    }
  }, []);

  //Ask for user's location

  return (
    <>
      <Header home={true} />
      <div className="page-content">
        <HeroBanner />
        <div className="body-content">
          <Typography variant="h6">Categories:</Typography>
          <CategoriesCarousel />
          <br></br>
          <br></br>

          <div className={classes.sectionHead}>
            <Typography variant="h6">Recently Added Businesses:</Typography>
            <Link to="/search">
              <Button variant="outlined" color="primary" size="small">
                View All
              </Button>
            </Link>
          </div>
          {fetching ? (
            <BusinessGridSkeleton number={6} />
          ) : (
            <ErrorBoundary>
              <BusinessGrid businessList={businessList} mini={true} />
            </ErrorBoundary>
          )}
          <br></br>
          <br></br>
        </div>
      </div>
    </>
  );
};

export default HomePage;
