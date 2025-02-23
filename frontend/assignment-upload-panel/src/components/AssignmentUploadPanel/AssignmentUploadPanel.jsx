import React, { useState } from 'react';
import FileUpload from './FileUpload';
import PreviewPane from './PreviewPane';
import SubmitButton from './SubmitButton';
import './styles.css';

const AssignmentUploadPanel = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
        setError('');
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Call the upload function from the utils or services
            // await uploadFiles(files);
            // Reset the files after successful upload
            setFiles([]);
        } catch (err) {
            setError('Failed to upload files. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="assignment-upload-panel">
            <h2>Upload Assignment</h2>
            {error && <div className="error-message">{error}</div>}
            <FileUpload onFileChange={handleFileChange} />
            <PreviewPane files={files} />
            <SubmitButton onClick={handleSubmit} loading={loading} />
        </div>
    );
};

export default AssignmentUploadPanel;