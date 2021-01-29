import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchFilter from "../components/SearchFilter";
import { useSearch } from "../contexts/SearchContext";
import Header from "../components/Header";
import BusinessGrid from "../components/BusinessGrid";
import BusinessGridSkeleton from "../components/skeletons/BusinessGridSkeleton";
import NoBusinessFound from "../components/NoBusinessFound";
import ErrorBoundary from "../components/ErrorBoundary";

const useStyles = makeStyles((theme) => ({
  page: {
    minHeight: "85vh",
    padding: theme.spacing(10, 1, 2),
  },
  locationCategory: {
    fontWeight: "bold",
  },
}));

const DirectoryPage = () => {
  const classes = useStyles();
  const [businessList, setBusinessList] = useState([]);
  const { contextCategory, contextLocation } = useSearch();
  const [fetching, setFetching] = useState(false);
  const [ready, setReady] = useState(false);

  const getBusinesses = async (fetchUrl) => {
    try {
      const res = await fetch(fetchUrl);
      const resJson = await res.json();
      setBusinessList(resJson);
      setFetching(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    setFetching(true);
    let paramString = "";
    if (contextCategory && contextLocation) {
      paramString = `?category=${contextCategory}&location=${contextLocation}`;
    } else if (contextCategory) {
      paramString = `?category=${contextCategory}`;
    } else if (contextLocation) {
      paramString = `?location=${contextLocation}`;
    }

    let fetchUrl = `${process.env.REACT_APP_SERVER_ALL_BUSINESSES}${paramString}`;
    getBusinesses(fetchUrl);
  }, [contextCategory, contextLocation]);

  let subText = (
    <Typography className={classes.subText} variant="body2">
      All Businesses
    </Typography>
  );
  if (contextLocation && contextCategory) {
    subText = (
      <Typography className={classes.subText} variant="body2">
        <span className={classes.locationCategory}>{contextCategory}</span>{" "}
        businesses in{" "}
        <span className={classes.locationCategory}>{contextLocation}</span>
      </Typography>
    );
  } else if (contextCategory) {
    subText = (
      <Typography className={classes.subText} variant="body2">
        <span className={classes.locationCategory}>{contextCategory}</span>{" "}
        businesses
      </Typography>
    );
  } else if (contextLocation) {
    subText = (
      <Typography>
        All businesses in{" "}
        <span className={classes.locationCategory}>{contextLocation}</span>
      </Typography>
    );
  }

  return (
    <>
      <Header home={false} />
      <div className={classes.page}>
        <Container maxWidth="lg" style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ textAlign: "center", fontWeight: "700" }}
          >
            directory
          </Typography>
          <SearchFilter />
          {ready ? (
            <>
              {subText}
              {fetching ? (
                <BusinessGridSkeleton number={8} />
              ) : businessList.length === 0 ? (
                <NoBusinessFound />
              ) : (
                <ErrorBoundary>
                  <BusinessGrid businessList={businessList} />
                </ErrorBoundary>
              )}
            </>
          ) : (
            <BusinessGrid />
          )}
        </Container>
      </div>
    </>
  );
};

export default DirectoryPage;
