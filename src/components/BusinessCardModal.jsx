import React, { useEffect } from "react";
import BusinessCard from "./BusinessCard";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, Button, IconButton } from "@material-ui/core";

const BusinessCardModal = ({ business, closeModal }) => {
  //hook to prevent body from scrolling while component is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const handleClose = (e) => {
    if (
      e.target.classList.contains("backdrop") ||
      e.target.classList.contains("close-btn")
    ) {
      closeModal(null);
    }
  };

  return (
    <div className="backdrop" onClick={handleClose}>
      <div className="modal-card">
        <BusinessCard dbObject={business} />
      </div>
      <IconButton
        aria-label="close-modal"
        style={{ background: "white" }}
        className="close-btn"
        onClick={(e) => handleClose(e)}
      >
        <CloseIcon />
      </IconButton>
      {/* <Button onClick={(e) => handleClose(e)} variant="contained">
        <Typography className="close-btn">x</Typography>
      </Button> */}
    </div>
  );
};

export default BusinessCardModal;
