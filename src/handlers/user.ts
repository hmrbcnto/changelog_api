import prisma from '../db';
import { hashPassword, createJWT, comparePassword } from '../modules/auth';

export const createNewUser = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hashedPassword
    }
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username }
  });

  if (!user) {
    res.status(401);
    res.json({
      message: 'Invalid username or password'
    });
    return;
  };

  const isValid = await comparePassword(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({
      message: 'Invalid username or password'
    });
    return;
  };

  const token = await createJWT(user);
  res.status(200);
  res.json({
    token
  });
};

