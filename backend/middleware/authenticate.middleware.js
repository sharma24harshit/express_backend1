const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next)=>{
    
        const token = req.headers.authorization;
        //console.log("token",token)
        
         if(token){
         const decoded = jwt.verify(token, "masai")
           if(decoded){
            const userId = decoded.userID
            // console.log("decoded",decoded)
            req.body.userID = userId
            next()
           }
           else{
            res.send({"msg":"Log In First"});
           }
        }
        else{
            res.send({"msg":"Log In First"});
        }
}

module.exports = {Authenticate}