const jwt = require('jsonwebtoken')

exports.authMiddleware = (req,res,next) => {
    const headers = req.headers.authorization;
    if(!headers || headers.startsWith('Bearer ')) return res.status(401).json({error: "token required!"})
    const token = headers.split(" ")[1]
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        res.status(400).json({error: "Invalid or expired token"})
    }
}