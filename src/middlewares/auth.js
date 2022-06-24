const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({messege:"Please login again"})
    }
    try {
          jwt.sign(token,"secret",(err,data) => {
          if(err){
            return err
          }
          else{
            return next();
          }
      })
    } catch {
      return res.status(403).json({messege:"unauthorised token"});
    }
  };

  module.exports =  {auth}