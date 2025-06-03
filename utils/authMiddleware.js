// const User = require('../models/User');

// const authenticateUser = async (req, res, next) => {
//   const userId = req.header('x-user-id');

//   if (!userId) return res.status(401).json({ message: 'Missing user ID header' });

//   const user = await User.findById(userId);
//   if (!user) return res.status(403).json({ message: 'User not found' });

//   req.user = user;
//   next();
// };

// module.exports = authenticateUser;


const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(403).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;

