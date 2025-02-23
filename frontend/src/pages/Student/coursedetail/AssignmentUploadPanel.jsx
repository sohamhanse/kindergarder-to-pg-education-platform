import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// ...existing imports...

const AssignmentUploadPanel = () => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = ({ file, fileList }) => {
    const isImageOrPdf = file.type === 'application/pdf' || file.type.startsWith('image/');
    if (!isImageOrPdf) {
      message.error('You can only upload PDF or image files!');
      return;
    }
    setFileList(fileList);
  };

  const handleSubmit = () => {
    if (fileList.length === 0) {
      message.error('Please upload at least one file.');
      return;
    }
    // Handle file submission logic here
    message.success('Assignment uploaded successfully!');
  };

  return (
    <div className="assignment-upload-panel">
      <Upload
        fileList={fileList}
        beforeUpload={() => false}
        onChange={handleUpload}
        multiple
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginTop: 16 }}
      >
        Upload Assignment
      </Button>
    </div>
  );
};

export default AssignmentUploadPanel;
