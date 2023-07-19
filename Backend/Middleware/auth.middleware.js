const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const tokenValue = token.split(" ")[1];
      
      const decoded = jwt.verify(tokenValue, "mock");
      if (decoded) {
        req.body.userID = decoded.userId;
        req.body.assignedUser = decoded.name;
        req.body.role = decoded.role;
        next();
      } else {
        res.json({ msg: "Invalid token" });
      }
    } catch (err) {
      res.json({ msg: "Invalid token" });
    }
  } else {
    res.json({ msg: "Please login again" });
  }
};

module.exports = { auth };
