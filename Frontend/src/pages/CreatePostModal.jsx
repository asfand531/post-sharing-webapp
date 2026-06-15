import { useState } from "react";
import axios from "axios";
import { Modal, Input, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import icon from "../assets/plus.svg";

const { TextArea } = Input;

const CreatePostModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [caption, setCaption] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const resetForm = () => {
    setFileList([]);
    setCaption("");
  };

  const showModal = () => setOpen(true);

  const handleOk = async () => {
    if (!fileList.length) {
      messageApi.open({ type: "error", content: "Please upload an image." });
      return;
    }
    if (!caption.trim()) {
      messageApi.open({ type: "error", content: "Please write a caption." });
      return;
    }

    setConfirmLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", fileList[0].originFileObj); // raw file → backend uploads to Cloudinary
      formData.append("caption", caption);

      const response = await axios.post(
        "http://localhost:3000/create-post",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      console.log(response.data);
      messageApi.open({ type: "success", content: "Posted successfully!" });
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error);
      messageApi.open({
        type: "error",
        content: "Failed to post. Please try again.",
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  const uploadButton = (
    <button
      className="flex flex-col items-center justify-center"
      style={{ border: 0, background: "none" }}
      type="button"
    >
      <PlusOutlined />
      <span className="mt-2 text-sm">Upload</span>
    </button>
  );

  return (
    <>
      {contextHolder}
      <div className="fixed right-5 top-5 z-50">
        <button
          onClick={showModal}
          className="group flex items-center bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-full h-11 w-11 hover:w-36 overflow-hidden transition-all duration-300 ease-in-out shadow-lg cursor-pointer"
        >
          <div className="flex items-center gap-2 px-3 min-w-max">
            <img src={icon} alt="Create Post" className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100">
              Create Post
            </span>
          </div>
        </button>
      </div>

      <Modal
        title="Create Post"
        open={open}
        onOk={handleOk}
        okText="Post"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        mask={{ closable: false }}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <div className="flex flex-row gap-4 py-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-600">
              Image <span className="text-red-500">*</span>
            </span>
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              showUploadList={{ showPreviewIcon: false }}
              accept="image/*"
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <span className="text-sm font-medium text-gray-600">
              Caption <span className="text-red-500">*</span>
            </span>
            <TextArea
              rows={4}
              placeholder="What's on your mind?"
              maxLength={200}
              showCount
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreatePostModal;
