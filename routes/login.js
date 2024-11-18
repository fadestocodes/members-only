const {Router} = require('express');
const loginRouter = Router();
const passport = require('passport');

loginRouter.get('/', (req,res) =>{
    res.render('login', {user : req.user});
});

loginRouter.post('/', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/'
}));



module.exports = {loginRouter};