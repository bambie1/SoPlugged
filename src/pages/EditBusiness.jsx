import React, { useState, useEffect } from "react";
import BusinessInfoForm from "../components/BusinessInfoForm";
import { useAuth } from "../contexts/AuthContext";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import { getImageUrl } from "../utils/uploadFile";
import BusinessInfoSkeleton from "../components/skeletons/BusinessInfoSkeleton";
import { useHistory } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

const useStyles = makeStyles((theme) => ({
  page: {
    padding: theme.spacing(10, 1, 2),
    minHeight: "85vh",
  },
}));

const EditBusiness = () => {
  const {
    currentUser,
    currentBusiness,
    setCurrentBusiness,
    setIsNewBusiness,
    getUserToken,
  } = useAuth();
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const getUserBusiness = async () => {
    try {
      const userToken = await getUserToken();
      // console.log(userToken);
      const res = await fetch(process.env.REACT_APP_SERVER_ONE_BUSINESS, {
        method: "GET",
        headers: {
          "Firebase-Token": userToken,
        },
      });
      if (!res.ok) {
        throw new Error("HTTP status " + res.status);
      }
      const resJson = await res.json();
      setCurrentBusiness(resJson);
    } catch (error) {
      console.log("error", error);
      setCurrentBusiness(null);
    } finally {
      setFetching(false);
    }
  };
  const updateBusiness = async (fetchUrl, fetchMethod, businessObject) => {
    try {
      const userToken = await getUserToken();
      const res = await fetch(fetchUrl, {
        method: fetchMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Firebase-Token": userToken,
        },
        body: JSON.stringify({
          business: businessObject,
        }),
      });
      if (!res.ok) {
        throw new Error("HTTP status " + res.status);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (currentBusiness) {
      setFetching(false);
    } else {
      getUserBusiness();
    }
  }, [currentUser, currentBusiness]);

  const handleSubmit = async (data, files) => {
    const { logo, ...dbData } = data;

    setSaving(true);
    let logoUrl = "";
    let images = [];
    if (logo[0]) logoUrl = await getImageUrl(logo[0]);
    for (let i = 0; i < files.length; i++) {
      files[i] &&
        images.push(
          typeof files[i] === "string" ? files[i] : await getImageUrl(files[i])
        );
    }

    if (!logoUrl) logoUrl = currentBusiness?.logo_url;

    if (currentBusiness) {
      setIsNewBusiness(false);
    }
    const businessObject = {
      owner_name: data.ownerName,
      email: currentUser.email,
      phone_number: data.ownerPhone,
      business_name: data.businessName,
      business_url: data.businessUrl,
      business_location: data.businessLocation,
      logo_url: logoUrl || "",
      sample_images: images.join(),
      category: data.businessCategory,
      tags: data.businessTags || "",
      business_description: data.businessDescription,
    };
    const fetchUrl = currentBusiness
      ? process.env.REACT_APP_SERVER_ONE_BUSINESS
      : process.env.REACT_APP_SERVER_ALL_BUSINESSES;
    const fetchMethod = currentBusiness ? "PATCH" : "POST";

    updateBusiness(fetchUrl, fetchMethod, businessObject); //create or update

    localStorage.setItem("businessObject", JSON.stringify(businessObject));
    setCurrentBusiness(businessObject);
    setSaving(false);
    history.push("/preview");
  };

  return (
    <>
      <Header home={false} />
      <Container maxWidth="lg" className={classes.page}>
        {fetching ? (
          <BusinessInfoSkeleton />
        ) : (
          <ErrorBoundary>
            <BusinessInfoForm submitHandler={handleSubmit} />
          </ErrorBoundary>
        )}
      </Container>
      {saving && (
        <div
          className="backdrop"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ margin: "auto", textAlign: "center", width: "150px" }}>
            <div className="lds-grid">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
                <div key={x}></div>
              ))}
            </div>
            <Typography style={{ color: "white" }}>
              Loading your Business Card
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBusiness;
