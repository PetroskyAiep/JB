const express = require('express');
const rouwe = express.Router();

//Routes
router.get('', (req, res) =>{
    res.send('Hello World');
})

module.exports = router;