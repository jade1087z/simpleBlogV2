import axios from "axios";
import React from "react";

const Image = (props) => {
    const FileUpload = (e) => {
        console.log(e.target.files);
        let formData = new FormData();
        formData.append("file", e.target.files[0]);

        axios.post("/api/post/image/upload", formData).then((res) => {
            props.setImage(res.data.filePath);
            console.log(res.data.filePath);
        });
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => FileUpload(e)}
            />
        </div>
    );
};

export default Image;
