import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async function Authorization(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ errorAuth: 'Operador não logado' });
  }
  const token = authorization.split(' ');
  try {
    const dados = jwt.verify(token[1], process.env.TOKEN_SECRET);
    const { id, user } = dados;
    req.userId = id;
    req.userName = user;
    const userModify = await User.findOne({
      where: {
        id,
        user,
      },
    });
    if (!userModify) {
      return res.json({ errorAuth: 'Usuário modificado!!' });
    }
  } catch (e) {
    return res.json([e]);
  }
  next();
}
