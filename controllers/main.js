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
  console.log(email, password);
  if (!email || !password) {
    throw new Unaunthenticated('Please provide email and password');
  }

  const userInfo = await mainService.validateUser(email, password);
  const { id, username } = userInfo[0];
  const token = jwt.sign({ id: id, username: username }, process.env.JWT_SECRET, {
   // expiresIn: '2m',
   expiresIn: '2h',
  });

  res.status(200).json({ msg: 'Login successful', token });
};

const validateToken = async (req, res) => {
  console.log('testing token');
  res.status(200).json({ msg: "you are authenticated", isValid: true });
}
const register = async (req, res) => {
  console.log('register');
  const mainService = new service();
  console.log(req.body);
  const { username, email, password } = req.body;
  console.log(username, email, password);
  if (!username || !email || !password) {
    throw new Unaunthenticated('Please provide email and password');
  }

  const test = await mainService.registerUser(username, password , email);



  res.status(200).json({ msg: 'registered successfully', test: test });


};
module.exports = { test, login, validateToken, register };
