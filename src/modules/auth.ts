import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const createJWT = (user) => {
  const token = jwt.sign({ 
    id: user.id, 
    username: user.username 
  }, 
    process.env.JWT_SECRET);
  return token;
};

const protect = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    res.status(401);
    res.json({ message: 'Unauthorized' });
    return;
  }

  const [, token] = bearerToken.split(' ');

  if (!token) {
    res.status(401);
    res.json({ message: 'Unauthorized' });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401);
    res.json({ message: 'Unauthorized' });
    return;
  }
};

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
}

const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export default {
  createJWT,
  protect
};
