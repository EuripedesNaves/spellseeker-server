// Requires
const { Router } = require('express');
const User = require('../models/User.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Environment
const router = Router();
require("dotenv").config();

//Routes

router.post('/register', async (req, res, next) => {
    const { email, password, name } = req.body;

    //Garantir campos
    if (!email || !password || !name) {
        res.status(400).json({ mesage: 'Something was forgotten email, password or name!' })
        return
    }

    //Garantir email válido
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    if (!emailRegex.test(email)) {
        res.status(400).json({ mesage: 'Something was wrong! Return valid email' })
        return
    }

    //Verificar se usuário já existe
    try {
        const foundedUser = await User.findOne({ email });

        if (foundedUser) {
            res.status(400).json({ mesage: 'User already exist' })
            return
        }

        // Gerar password hash
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const createdUser = await User.create({ name, email, password, passwordHash });

        const { _id } = createdUser;
        res.status(201).json({ email, name, _id })

    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return
        }
        const compareHash = bcrypt.compareSync(password, user.passwordHash);

        if (!compareHash) {
            res.status(401).json({ message: 'Invalid password ' });
            return
        }

        const payload = {
            id: user._id,
            email: user.email,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1year' });
        res.status(200).json({ ...payload, token });

    } catch (error) {
        next(error)
    }

})

module.exports = router;
