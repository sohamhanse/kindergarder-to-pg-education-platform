export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('File upload failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export const getUploadStatus = async (uploadId) => {
    try {
        const response = await fetch(`/api/upload/status/${uploadId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch upload status');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching upload status:', error);
        throw error;
    }
};