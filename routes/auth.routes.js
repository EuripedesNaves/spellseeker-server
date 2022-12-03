const { Router } = require('express')
const User = require('../models/User.model.js')
const bcrypt = require('bcryptjs')

const router = Router()

router.post('/register', async (req, res, next) => {
    const {email, password, name} = req.body;
    
    //Garantir campos
    if(!email || !password || !name){
        res.status(400).json({mesage: 'Something was forgotten email, password or name!'})
    return
    }

    //Garantir email válido
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    if (!emailRegex.test(email)){
        res.status(400).json({mesage: 'Something was wrong! Return valid email'})
        return  
    }

    //Verificar se usuário já existe
    try {
        const foundedUser = await User.findOne({ email })
    
        if(foundedUser){
           res.status(400).json({mesage: 'User already exist'})
           return  
        }
    
        // Gerar password hash
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
    
        const createdUser = await User.create({name, email, passwordHash});
        
        let ( _id ) = createdUser;

        res.status(201).json({ _id});
    } catch (error) {
        next(error)
    }
})

module.exports = router;
