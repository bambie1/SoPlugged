import React, { useEffect } from "react";
import useImageUploader from "@hooks/useImageUploader";
import { useFormikContext } from "formik";
import FileDropzone from "../FileDropzone";

const BusinessFormStep4 = () => {
  const { setFieldValue, values } = useFormikContext();
  const [url, error, uploadImage, uploading] = useImageUploader();

  useEffect(() => {
    if (url) setFieldValue("logoUrl", url);
  }, [url]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    uploadImage(file, "business_logos");
  };

  return (
    <>
      <div>
        <input
          accept="image/png, image/jpeg"
          id="business-logo"
          name="logoUrl"
          type="file"
          onChange={handleFileUpload}
          value=""
        />
        <label htmlFor="business-logo">
          <button disabled={uploading}>
            {url || values.logoUrl ? "Change Logo" : "UploadLogo"}
          </button>
        </label>
        {url && <Avatar src={url} variant="square" />}
        {values.logoUrl && !url && (
          <Avatar src={values.logoUrl} variant="square" />
        )}
        {error && <p>{error}</p>}
      </div>
      <FileDropzone />
    </>
  );
};

export default BusinessFormStep4;
