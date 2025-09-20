

exports.authorize =  (...allowedRoles) => {
    return async (req,res,next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({error: 'You`re not authorized to perform this action'})
        }
        next()
    }
}