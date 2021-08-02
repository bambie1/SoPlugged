import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import BusinessHeader from "./BusinessHeader";

const BusinessCard = ({ mini, average, ...props }) => {
  const {
    business_name,
    business_location,
    logo_url,
    sample_images,
    category,
    fixed_to_one_location,
    street_address,
    slug,
  } = props.dbObject;
  const images = sample_images?.split(",") || [];

  return (
    <Link href={`/business/${slug}`}>
      <a>
        <BusinessHeader>
          <h6>{business_name}</h6>
        </BusinessHeader>

        <p style={{ fontWeight: "bold" }}>{category}</p>
        <br></br>
        {!mini && (
          <>
            {images.length !== 0 && images[0].length !== 0 && (
              <Carousel dynamicHeight={true}>
                {images.map((img, index) => (
                  <img
                    key={index}
                    className="business-image"
                    src={img}
                    alt="business-display"
                  />
                ))}
              </Carousel>
            )}
          </>
        )}
        <p style={{ marginTop: "auto" }}>
          {street_address &&
            fixed_to_one_location &&
            `LOCATION: ${street_address}`}
          {street_address && fixed_to_one_location && <br></br>}
          {business_location}
          <br></br>
          {!fixed_to_one_location && (
            <span
              style={{
                fontWeight: "bold",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              CANADA-WIDE
            </span>
          )}
        </p>
      </a>
    </Link>
  );
};

export default BusinessCard;
