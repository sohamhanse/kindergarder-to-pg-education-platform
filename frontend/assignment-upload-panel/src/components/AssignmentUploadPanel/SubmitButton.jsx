const SubmitButton = ({ onClick, loading }) => {
    return (
        <button 
            className="submit-button" 
            onClick={onClick} 
            disabled={loading}
        >
            {loading ? 'Uploading...' : 'Submit Assignment'}
        </button>
    );
};

export default SubmitButton;