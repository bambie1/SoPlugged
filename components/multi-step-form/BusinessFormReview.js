import React from "react";
import { useFormikContext } from "formik";

const BusinessFormReview = () => {
  const { setFieldValue, values } = useFormikContext();
  const {
    businessCategory,
    businessDescription,
    businessLocation,
    businessName,
    businessUrl,
    canadaWide,
    igHandle,
    sampleImages,
    logoUrl,
    streetAddress,
    phoneNumber,
  } = values;
  const sampleImagesArray = sampleImages === "" ? [] : sampleImages.split(",");

  return (
    <div style={{ marginTop: "8px" }}>
      <div>
        <input placeholder="Business name" />
      </div>
      <div>
        <input placeholder="Category" />
      </div>
      {businessUrl && (
        <div>
          <input placeholder="Business url" />
        </div>
      )}
      {igHandle && (
        <div>
          <input placeholder="IG handle" />
        </div>
      )}

      {phoneNumber && (
        <div>
          <input placeholder="Phone Number" />
        </div>
      )}

      <div item xs={12}>
        <input placeholder="Business description" />
      </div>
      {businessLocation && (
        <div>
          <input placeholder="Business Location" />
        </div>
      )}
      {streetAddress && (
        <div>
          <input placeholder="Street Address" />
        </div>
      )}
      {canadaWide && (
        <div item xs={12}>
          <p>CANADA-WIDE</p>
        </div>
      )}
      <div item xs={12}>
        {(sampleImagesArray.length > 0 || logoUrl) && (
          <>
            <p>Logo and Sample Images:</p>
            {/* <div>
              <Avatar alt="Business Logo" src={logoUrl}>
                {businessName.toUpperCase().charAt(0)}
              </Avatar>
              {sampleImagesArray.map((image, index) => (
                <Avatar key={index} src={image} variant="square" />
              ))}
            </div> */}
          </>
        )}
      </div>
      <hr style={{ width: "60%" }}></hr>
    </div>
  );
};

export default BusinessFormReview;
