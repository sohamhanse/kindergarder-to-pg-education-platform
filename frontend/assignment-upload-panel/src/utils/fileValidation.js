function validateFile(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            message: 'File type must be JPEG, PNG, or PDF.'
        };
    }

    if (file.size > maxSize) {
        return {
            isValid: false,
            message: 'File size must be less than 5 MB.'
        };
    }

    return {
        isValid: true,
        message: 'File is valid.'
    };
}

export { validateFile };