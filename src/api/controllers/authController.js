const User = require("../../models/userModel");
const constants = require("../../helper/constants");
const bcrypt = require('bcryptjs')
const { errorResponse } = require("../../helper/responseTransformer");
const config = require('../../helper/config')
const jwt =require ('jsonwebtoken');



exports.register = async (req, res) => {
  try {
    const { Password, ...restBody } = req.body;

    if (!Password) {
      return res.status(constants.status_code.header.bad_request).send({
        error: "Password is required",
        success: false
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    // Create new user with hashed password
    const user = new User({ ...restBody, Password: hashedPassword });

    // Save user to the database
    await user.save();

    return res.status(constants.status_code.header.ok).send({
      message: constants.auth.register_success,
      success: true
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(constants.status_code.header.server_error).send({
      error: errorResponse(error),
      success: false
    });
  }
};



exports.login = async (req, res) => {
  try {
    const { EmailId, Password } = req.body;

    if (!EmailId || !Password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and Password are required' 
      });
    }

    // Find user by EmailId
    const user = await User.findOne({ EmailId });

    // Check if user exists and validate password
     if (!user || !(await bcrypt.compare(Password, user.Password))) {
      
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid Email or Password' 
      });
    }

    // Extract user roles
    // const userRoles = user.Roles.map(role => role.Role);

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, config.JWT_KEY, { expiresIn: '30d' });

    // Send token and user info in response
    res.status(constants.status_code.header.ok).json({
      success: true,
      message: 'Login successful',
      token,
      userId: user._id,

    });
  } catch (error) {
    return res.status(constants.status_code.header.server_error).json({ 
      success: false, 
      error: error.message 
    });
  }
};
