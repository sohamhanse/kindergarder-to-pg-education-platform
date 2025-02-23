import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const PreviewPane = ({ files }) => {
    return (
        <div className="preview-pane">
            {files.length > 0 ? (
                files.map((file, index) => (
                    <div key={index} className="file-preview">
                        {file.type.startsWith('image/') ? (
                            <img src={URL.createObjectURL(file)} alt={`Preview of ${file.name}`} className="image-preview" />
                        ) : (
                            <div className="pdf-preview">
                                <span>{file.name}</span>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No files selected for preview.</p>
            )}
        </div>
    );
};

PreviewPane.propTypes = {
    files: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
};

export default PreviewPane;