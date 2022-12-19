import User from '../models/User';

export default async function administrator(req, res, next) {
  try {
    const id = req.userId;
    const user = await User.findByPk(id);
    const { level } = user;
    if (typeof level !== 'string') {
      return res.json('Operador inválido');
    }
    if (level !== 'administrator') {
      return res.json('Você não pode executar essa tarefa, favor conectar como administrador');
    }
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
  next();
}
