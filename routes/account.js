const {Router} = require('express');
const accountRouter = Router();
const passport = require('passport');

accountRouter.get('/', (req,res) =>{
        res.render('account', {user : req.user});
});

module.exports = {accountRouter};