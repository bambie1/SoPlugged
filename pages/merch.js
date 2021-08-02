import React from "react";
import displayShopifyCollection from "../src/shopifyStore";
import SEO from "@components/SEO";

const Merch = () => {
  return (
    <>
      <SEO
        description="Custom tees, sweatshirts and accessories to spread the word"
        title="SoPlugged Merch"
      />
      <div className="page">
        <h1>merch</h1>
        <p>
          Normalize <b>#buyingblack</b>, but make it fashionable
        </p>
        <hr
          style={{ width: "40%", maxWidth: "170px", marginBottom: "40px" }}
        ></hr>
        <div
          id="collection-component-1622397974663"
          style={{ position: "relative", display: "flex", minHeight: "250px" }}
        >
          {displayShopifyCollection(
            "collection-component-1622397974663",
            "267757355198"
          )}
        </div>
      </div>
    </>
  );
};

export default Merch;
