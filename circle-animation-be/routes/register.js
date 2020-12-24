const UserModel = require('../model/UserModel.js');
const bcrypt = require('bcrypt');
const jwtCreate = require('../jwt');

async function register(req, res) {
  req.body.comboInfo = [];
  for (let i = 1; i <= 20; i++) {
    let str = `m_0${i < 10 ? `0${i}` : i}`;
    let obj = { beatmap: str, combo: 0 };
    req.body.comboInfo.push(obj);
  }

  let hash = await bcrypt.hash(req.body.password, 10);
  req.body.password = hash;

  let user = new UserModel(req.body);
  user.save((error, user) => {
    if (error) return res.status(404).json({ error });

    // jwt/authentication
    let token = jwtCreate({ id: user._id });
    res.cookie('circle-animation-token', token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({ message: user.username });
  });
}

module.exports = register;
