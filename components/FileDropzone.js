import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Typography,
  makeStyles,
  Avatar,
} from "@material/mui-components";
import { CloudUploadIcon } from "@material/mui-icons";
import useImageUploader from "@hooks/useImageUploader";
import { useFormikContext } from "formik";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#4e3505",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#4e3505",
  outline: "none",
  transition: "border .24s ease-in-out",
  marginBottom: "8px",
  cursor: "pointer",
};

const thumbsContainer = {
  display: "flex",
  flexWrap: "wrap",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  marginBottom: 8,
  padding: 4,
  boxSizing: "border-box",
  position: "relative",
};

const closeBtn = {
  alignSelf: "start",
  marginRight: "8px",
  borderRadius: "50%",
  border: "none",
  position: "absolute",
  top: "0px",
  right: "-10px",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const useStyles = makeStyles((theme) => ({
  dropZone: { cursor: "default !important" },
}));
const MAX_FILES = 3; //file upload limit

const FileDropzone = () => {
  const { setFieldValue, values } = useFormikContext();
  let currentImages = [];
  if (values.sampleImages !== "")
    currentImages = values.sampleImages.split(",");
  const [myFiles, setMyFiles] = useState(currentImages);
  const [fileError, setFileError] = useState(false);
  const classes = useStyles();
  const [url, error, uploadImage] = useImageUploader();

  useEffect(() => {
    if (url) {
      if (myFiles.length + 1 <= MAX_FILES) {
        setMyFiles([...myFiles, url]);
        setFileError(false);
      } else {
        setFileError(true);
      }
    }
  }, [url, error]);
  useEffect(() => {
    setFieldValue("sampleImages", myFiles.join());
  }, [myFiles]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.map(async (file) => {
        uploadImage(file, "business_images");
      });
    },
    [myFiles]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections,
    open,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: MAX_FILES,
    noKeyboard: true,
    maxSize: 16777216,
  });
  const removeFile = (file) => () => {
    let filtered = myFiles.filter(function (item) {
      return item !== file;
    });
    setMyFiles(filtered);
  };
  const removeAll = () => {
    setMyFiles([]);
  };

  const files = myFiles.map((file, index) => {
    if (file == "") return <></>;
    return (
      <React.Fragment key={index}>
        <div style={thumb} key={index}>
          <Avatar src={file} alt="" />
          <button type="button" onClick={removeFile(file)} style={closeBtn}>
            x
          </button>
        </div>
      </React.Fragment>
    );
  });

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [myFiles]
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <>
      <div {...getRootProps({ style })} className={classes.dropZone}>
        <input {...getInputProps()} />
        <Typography variant="body2">
          Upload up to 3 images to showcase your services to customers.
        </Typography>
        <br></br>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CloudUploadIcon />}
          onClick={open}
        >
          Click to upload images
        </Button>
      </div>

      {files.length > 0 && (
        <>
          <aside style={thumbsContainer}>
            {files}

            <Button
              type="button"
              onClick={removeAll}
              style={{ alignSelf: "center", marginLeft: "8px" }}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Remove All
            </Button>
          </aside>
        </>
      )}
      {(fileRejections.length !== 0 || fileError) && (
        <aside>
          <Typography variant="caption" color="error">
            Error: You can only upload 3 images (each under 1 MB)
          </Typography>
        </aside>
      )}
    </>
  );
};

export default FileDropzone;
