const { Router } = require('express')

const router = Router()

router.post('/signup', async (req, res, next) => {
    const user = req.body;
    console.log(user);
})

module.exports = router;
