const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

    // Data Validation
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user is already in the database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create New User
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ success: `${user.username} has been created.` });
    } catch(err) {
        res.status(400).send(err);
    }

});

router.post('/login', async (req, res) => {
    // Data Validation
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password invalid');

    // Verify password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {return res.status(400).send('Password is incorrect')};

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({
        'auth-token': token
    });
});



module.exports = router;