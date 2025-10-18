// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    console.error("Error handler", err);
    res.status(500).json({ 
        success: false, 
        message: "Internal server error", 
        error: { 
            message: err.message, 
            stack: err.stack 
        } 
    });
};

export default errorHandler;