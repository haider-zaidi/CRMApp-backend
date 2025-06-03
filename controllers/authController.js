const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const googleLogin = async (req, res) => {
//   const { id_token } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: id_token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { sub, email, name, picture } = payload;

//     let user = await User.findOne({ googleId: sub });
//     if (!user) {
//       user = await User.create({
//         googleId: sub,
//         email,
//         name,
//         picture,
//       });
//     }

//     return res.status(200).json({
//       message: 'Login successful',
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//         picture: user.picture
//       }
//     });
//   } catch (error) {
//     console.error('Google login error:', error);
//     return res.status(401).json({ message: 'Invalid Google token' });
//   }
// };



const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
  const { id_token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload(); 

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: 'Login failed' });
  }
};

module.exports = { googleLogin };