const User = require("../schemas/User");
controller = {
  get_user: async (req, res) => {
    const id = req.params.id;
    var user = null;
    if (id == Number(id)) user = await User.findByPk(id);
    else user = await User.findOne({ where: { username: id } });
    if (user) {
      const { password, ...rest } = user.dataValues;
      return res.status(200).json(rest);
    }
    return res.status(404).send('not found user');
  },
};
module.exports = controller;
