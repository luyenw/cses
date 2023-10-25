const bcrypt = require("bcrypt");
const User = require("../schemas/User");
const jwt = require("jsonwebtoken");
const { Validation } = require("../validations/validations");
const oauth = require("../oauth/index");
const axios = require("axios");

var controller = {};
controller = {
  verify_token: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("denied");
    try {
      var decoded = await jwt.verify(
        token.split(" ")[1],
        process.env.ACCESS_SECRET_TOKEN
      );
      const {password, ...rest} = decoded
      return res.status(200).send(rest);
    } catch (e) {
      return res.status(403).json({ msg: e });
    }
  },
  post_register: async (req, res) => {
    const inp = req.body;
    try {
      const validatedDate = Validation.validateRegister(inp);
      const user = await User.findOne({ where: { username: inp.username } });
      if (user) {
        res.status(422).json({ msg: "username is exist" });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(inp.password, salt);

      const new_user = new User({
        username: inp.username,
        password: hash_password,
        name: inp.name,
      });
      returned_user = await User.create(new_user.dataValues);
      if (returned_user) {
        res.json(returned_user);
      }
    } catch (error) {
      res.status(422).json({ "Validation error:": error.message });
    }
  },
  google_login: async (req, res) => {
    try {
      res.redirect(oauth.request_get_auth_code_url);
    } catch (error) {
      res.sendStatus(500);
    }
  },
  oauth_callback: async (req, res) => {
    const authorization_token = req.query.code;
    try {
      // ! get access token using authorization token
      var response = await oauth.get_access_token(authorization_token);
      // get access token from payload
      const { access_token } = response.data;
      const query = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
      response = await axios.get(query);
      const data = await response.data;
      return res
        .setHeader("set-cookie", `access_token=${access_token}`)
        .sendStatus(200);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  post_login: async (req, res) => {
    inp = req.body;
    const user = await User.findOne({ where: { username: inp.username } });
    if (!user) {
      return res
        .status(422)
        .json({ msg: "username or password is not correct" });
    }
    const compare_password = await bcrypt.compare(inp.password, user.password);
    if (compare_password == false) {
      return res
        .status(422)
        .json({ msg: "username or password is not correct" });
    }
    const accessToken = jwt.sign(
      { username: user.username, password: user.password, id: user.id },
      process.env.ACCESS_SECRET_TOKEN
    );
    return res
      .setHeader("set-cookie", `access_token=${accessToken}`)
      .status(200)
      .send({ token: accessToken, user: user });
  },
  globalData: async (req, res) => {
    const user = await User.findOne({
      where: { username: res.locals.username },
    });
    return res.status(200).json(user);
  },
  get_login: (req, res) => {
    return res.status(200).send("get login");
  },
};
module.exports = controller;
