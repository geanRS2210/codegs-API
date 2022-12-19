import jwt from 'jsonwebtoken';

import User from '../models/User';

class LoginController {
  async index(req, res) {
    try {
      const { user, password } = req.body;
      const userLogin = await User.findOne({
        where: { user },
      });
      console.log(userLogin);
      if (!userLogin) {
        return res.status(400).json({ errors: 'Usuario inválido' });
      }
      if (!(await User.passwordIsValid(password, userLogin))) {
        return res.status(400).json({ errors: 'Senha inválida' });
      }
      const { id, level } = userLogin;
      const token = jwt.sign({ id, user }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      if (token) {
        console.log(token);
        return res.json({
          token,
          user,
          level,
          id,
        });
      }
    } catch (e) {
      return res.status(400).json({ e });
    }
  }
}

export default new LoginController();
