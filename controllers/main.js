const service = require("../services/main");
/*
testing

*/


const jwt = require('jsonwebtoken');

const Unaunthenticated = require("../errors/unaunthenticated");


const test = async (req, res) => {
    console.log('testing');
    const mainService = new service();
    let resultTest;
    //create a try catch for the resultTest
    /*  try { */
    resultTest = await mainService.test("a");
    /*  } catch (err) {
         console.log("ERROR -> " + err);
      /*    res.status(500).json({ msg: "something is wrong" }); */



    if (!resultTest) {
        throw new Error("something is wrong");

    }
    console.log(resultTest);
    res.status(200).json({ msg: "everything is fine", resultTest: resultTest });
}





const login = async (req, res) => {

    console.log('login');
    const mainService = new service();


    const { email, password } = req.body;

    if (!email || !password) {
        throw new Unaunthenticated('Please provide email and password');
    }

    try {



        try {
            isPasswordValid = await mainService.validateUser(email, password);

            if (!isPasswordValid) {
                throw new Unaunthenticated('Invalid credentials');
            }
        } catch (err) {
            console.log("ERROR -> " + err);
            /*     res.status(500).json({ msg: "something is wrong" }); */
            return;

        }

        // Generate a JWT token with the user's ID and username as payload
       /*  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        }); */
        const token = jwt.sign({ id: 1, username: email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.status(200).json({ msg: 'Login successful', token });
    } catch (error) {
        // Handle database errors or other exceptions
        throw new Unaunthenticated('Login failed');
    }
};


module.exports = { test, login };