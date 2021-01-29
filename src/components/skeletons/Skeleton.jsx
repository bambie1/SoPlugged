import React from "react";
import "./Skeleton.css";
import Animation from "./Animation";

const Skeleton = ({ type }) => {
  return (
    <div className={`skeleton ${type}`}>
      <Animation />
    </div>
  );
};

export default Skeleton;
