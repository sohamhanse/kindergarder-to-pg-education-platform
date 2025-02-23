function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    return fetch('/api/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('File upload failed');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error during file upload:', error);
        throw error;
    });
}

function handleUploadProgress(event, setProgress) {
    if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(percentComplete);
    }
}

export { uploadFile, handleUploadProgress };