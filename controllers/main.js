const service = require("../services/main");
const jwt = require('jsonwebtoken');
const Unaunthenticated = require("../errors/unaunthenticated");
const BadRequest = require("../errors/bad-request");

const test = async (req, res) => {
  console.log('testing');
  const mainService = new service();
  let resultTest;

  resultTest = await mainService.test("a");

  if (!resultTest) {
    throw new BadRequest("Empty result from test");
  }

  console.log(resultTest);
  res.status(200).json({ msg: "everything is fine", resultTest });
};

const login = async (req, res) => {
  console.log('login');
  const mainService = new service();

  const { email, password } = req.body;

  if (!email || !password) {
    throw new Unaunthenticated('Please provide email and password');
  }

  const userInfo = await mainService.validateUser(email, password);
  const { id, username } = userInfo[0];
  const token = jwt.sign({ id: id, username: username }, process.env.JWT_SECRET, {
    expiresIn: '2m',
  });

  res.status(200).json({ msg: 'Login successful', token });
};

const testToken = async (req, res) => {
  console.log('testing token');
  res.status(200).json({ msg: "you are authenticated" });
}
module.exports = { test, login, testToken };
