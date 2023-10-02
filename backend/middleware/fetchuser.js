const jwt = require("jsonwebtoken");
const JWT_SECRET = "947514abcd";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(400)
      .send({ errors: [{ msg: "Please authenticate using valid token" }] });
  }
  try {
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    console.log("user",req.user)
    next();
    
  } catch (error) {
    return res
      .status(400)
      .send({ error: [{ msg: "Please authenticate using valid token" }] });
  }
};
module.exports=fetchuser;