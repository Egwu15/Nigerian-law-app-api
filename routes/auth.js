const router = require("express").Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


router.post("/register", async (req, res) => {
    //VALIDATION
    const { error } = registerValidation(req.body,);
    if (error) {
        return res.send(error['details'][0]['message']);
    }

    //CHECKING IF EMAIL EXIST
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({ "error": "Email already exist" });

    //SALTING PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        savedUser = await user.save();

        res.send({
            name: req.body.name,
            email: req.body.email,
        });
    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/login', async (req, res) => {
    //VALIDATION
    const { error } = loginValidation(req.body);
    if (error) {
        return res.send(error['details'][0]['message']);
    }

    //CHECKING IF EMAIL EXIST
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ "error": "Email does not exist" });

    //COMPARING PASSWORD
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ "error": "password is not valid" });

    //GENERATING TOKEN
    const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECREAT);
    res.header("Authorization", token).send(token);
});
module.exports = router;