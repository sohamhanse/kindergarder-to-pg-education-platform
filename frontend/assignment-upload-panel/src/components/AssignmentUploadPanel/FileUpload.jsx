import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { validateFile } from '../../utils/fileValidation';

const FileUpload = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const validationError = validateFile(file);

        if (validationError) {
            setError(validationError);
            setSelectedFile(null);
        } else {
            setError('');
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    return (
        <div className="file-upload">
            <input
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
            />
            {error && <p className="error-message">{error}</p>}
            {selectedFile && <p className="file-name">{selectedFile.name}</p>}
        </div>
    );
};

FileUpload.propTypes = {
    onFileSelect: PropTypes.func.isRequired,
};

export default FileUpload;