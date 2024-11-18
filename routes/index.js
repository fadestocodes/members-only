const {Router} = require('express');
const indexRouter = Router();
const passport = require('passport');
const {getAllMessages} = require('../db/queries');


indexRouter.get('/', async (req,res) =>{
    const allMessages = await getAllMessages();

    
    res.render('index', {user : req.user, allMessages });
});

module.exports = {indexRouter};