import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      // const operator = new User();
      const newUser = await User.create(req.body);
      const { user, password, level } = newUser;
      // const { user } = newCreate;
      res.json({ user, password, level });
    } catch (e) {
      console.log(e);
    }
  }

  async index(req, res) {
    try {
      const user = await User.findAll();
      return res.json(user);
    } catch (e) {
      return res.status(400).json({ e });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    } catch (e) {
      return res.status(400).json({ e });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(400).json('usuário não encontrado');
      const newuser = await user.update(req.body);
      return res.status(200).json({ newuser });
    } catch (e) {
      res.status(400).json({ e });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(400).json('usuário não encontrado');
      await user.destroy();
      return res.status(200).json('Operador escluido com sucesso');
    } catch (e) {
      res.status(400).json({ e });
    }
  }
}

export default new UserController();
