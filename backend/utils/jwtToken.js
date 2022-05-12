// Create and send token and save in the cookie.
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  try {
    // Create Jwt token
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendToken;
