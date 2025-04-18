import User from "../models/User";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "./../../config/config";

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    res.cookie("t", token, { expire: new Date() + 999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(404).json({
      error: "Could not sign in",
    });
  }
};

const signout = async (req, res) => {
  res.clearCookie("t");

  return res.status(200).json({
    message: "Signed out",
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"], // Updates to docs means you need to add this for security or code breaks see docs here under 'Required Parameters': https://www.npmjs.com/package/express-jwt
});

console.log(
  "============================>>>>>>>>>>>>>>>>> authCtrl.requireSignin middleware triggered"
);

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorised",
    });
  }

  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
