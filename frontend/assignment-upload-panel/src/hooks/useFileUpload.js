const { useState } = require('react');

const useFileUpload = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
        }
    };

    const uploadFile = async (uploadUrl) => {
        if (!file) {
            setError('No file selected');
            return;
        }

        setIsUploading(true);
        setProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const reader = response.body.getReader();
            const contentLength = +response.headers.get('Content-Length');

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                setProgress((prev) => Math.min(prev + value.length / contentLength * 100, 100));
            }

            setFile(null);
            setProgress(100);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    return {
        file,
        error,
        isUploading,
        progress,
        handleFileChange,
        uploadFile,
    };
};

export default useFileUpload;