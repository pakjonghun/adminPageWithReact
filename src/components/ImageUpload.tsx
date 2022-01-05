import axios from "axios";
import React, { FC } from "react";

const ImageUpload: FC<{ cb: (url: string) => void }> = ({ cb }) => {
  const upload = async (val: FileList | null) => {
    try {
      if (val == null) return;
      const formData = new FormData();
      formData.append("image", val[0]);
      const { data } = await axios.post("/upload", formData);
      cb(data.upload);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <input
        onChange={(e) => upload(e.target.files)}
        className="form-control"
        accept="image/png image/jpeg"
        type="file"
        id="formFile"
        hidden
      />
      <label htmlFor="formFile" className="btn btn-primary">
        Upload
      </label>
    </>
  );
};

export default ImageUpload;
