import React, { useEffect, useState } from "react";
import css from "./index.css";
import templateImg from "../../static/images/dropzone-preview.png";
import Dropzone from "dropzone";
import { MainButton } from "../../ui/buttons";

interface Props {
  cb;
  defaultImgUrl?;
}

export function DropzoneForm(props: Props) {
  const [thumbnail, setThumbnail] = useState(
    props.defaultImgUrl || templateImg
  );
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    let myDropzone = new Dropzone("#my-dropzone-container", {
      url: "/falsa",
      previewsContainer: "#my-dropzone-preview",
      maxFiles: 1,
      autoProcessQueue: false,
      maxFilesize: 2, // MB
      thumbnailWidth: 333,
      thumbnailHeight: 147,
      resizeWidth: 333,
      resizeHeight: 147,
      resizeMethod: "contain",
      thumbnailMethod: "contain",
      clickable: "#button",
    });

    myDropzone.on("addedfile", (file) => {
      setErrorMessage(undefined);
    });

    myDropzone.on("maxfilesexceeded", function (file) {
      myDropzone.removeAllFiles();
      myDropzone.addFile(file);
    });

    myDropzone.on("thumbnail", function (file, dataURL) {
      setThumbnail(file.dataURL);
      props.cb(dataURL);
    });

    myDropzone.on("error", function (file, message) {
      setThumbnail(templateImg);
      setErrorMessage(message);
      props.cb(undefined);
    });
  }, []);

  return (
    <div className={css.container}>
      <img className={css["template-img"]} src={thumbnail} alt="template" />
      {errorMessage && <p>{errorMessage}</p>}
      <div id="my-dropzone-preview" className={css.preview}></div>
      <div id="my-dropzone-container">
        <div id="button">
          <MainButton type={"button"} color="green">
            Agregar/modificar foto
          </MainButton>
        </div>
      </div>
    </div>
  );
}
