const {Router} = require('express');
const newMessageRouter = Router();
const {addMessage} = require('../db/queries');

newMessageRouter.get('/', (req,res)=>{
    res.render('newMessage');
});

newMessageRouter.post('/', async (req,res)=>{
    const username = req.user.username;
    const messageContent = req.body.messageContent;
    const userId = req.user['user_id'];
    try {
        await addMessage( username, messageContent, userId );
        res.redirect('/');

    } catch (err) {
        return res.status(400).send('Error')
    }
});

module.exports = {newMessageRouter};