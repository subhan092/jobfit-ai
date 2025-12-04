import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Please login to continue",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("token decode:", decoded)
        req.id = decoded.userId; 
        next(); 
    } catch (error) {
        console.error("Error in userAuth:", error);
        res.status(500).json({
            message: "Invalid token",
            success: false
        });
    }
};

export default userAuth;
