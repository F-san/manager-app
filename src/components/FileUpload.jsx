import React, { useState } from "react";
import PropTypes from "prop-types"; //作用是为组件设置属性信息
import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { dalImgUrl, uploadUrl } from "../utils/tools";
export const FileUpload = ({ imageUrl, setImageUrl }) => {
  const [loading, setLoading] = useState(false);
  // 图片上传状态改变
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      console.log(info);
      setImageUrl(info.file.response.info);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        // name 表示服务器端接收到的数据的name属性
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={uploadUrl}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={dalImgUrl(imageUrl)}
            alt="file"
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};
// 定义组件的属性，可写可不写
FileUpload.propTypes = {
  // 该组件接收一个属性，类型为字符串且必填
  imageUrl: PropTypes.string.isRequired,
  setImageUrl: PropTypes.func,
};

export default FileUpload;
