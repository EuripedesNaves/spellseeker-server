const { Router } = require('express')
const user = require('../models/User.model.js')

const router = Router()
router.get('/', async (req, res) => {
    try {
        const userFromDb = await user.find().populate('')
        res.status(200).json(userFromDb)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router