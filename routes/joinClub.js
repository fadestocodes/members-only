const {Router} = require('express');
const joinclubRouter = Router();
const passport = require('passport');
require('dotenv').config();
const {updateStatus} = require('../db/queries');

joinclubRouter.get('/', (req,res) => {
    res.render('joinClub', {user : req.user});
});

joinclubRouter.post('/', async (req,res)=>{
    const passwordInput = req.body['vip-password'];
    if (!req.user){
        return res.status(401).send('You need to log in first');
    }
    
    try {
        const {user_id} = req.user;
        if (passwordInput === process.env.VIP_PASSWORD){
            await updateStatus(user_id);
            res.redirect('/account');
        } else {
            return res.status(403).send("Incorrect password to join the club. Try again.");
        }
     } catch (err) {
        console.error(err);
     }
})

module.exports = { joinclubRouter };