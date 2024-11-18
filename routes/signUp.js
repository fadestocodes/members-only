const {Router} = require('express');
const signupRouter = Router();
bcrypt = require('bcryptjs');
const {storeData} = require('../db/queries');
const {body, validationResult} = require('express-validator');

const validateUser = [
    body('firstName').trim().notEmpty().withMessage("Can't Be Empty"),
    body('lastName').trim().notEmpty().withMessage("Can't Be Empty"),
    body('username').notEmpty().withMessage("Can't Be Empty"),
    body('password').isLength({min:7}).withMessage("Password Must Be At Least 7 Characters")
    .matches(/[A-Z]/).withMessage("Must Contain At Least One Uppercase Letter")
    .matches(/\d/).withMessage("Must Contain At Least One Number"),
    body('confirmPassword').custom((value, {req})=>value === req.body.password).withMessage("Passwords Don't Match")
];


signupRouter.get('/', (req, res) =>{
    const errors = validationResult(req);
    res.render('signUp', {errors:[], old : {}});
});

signupRouter.post('/', validateUser, async (req,res,next)=>{
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(400).render('signUp', {errors : errors.array(), old: req.body});
    }

    await bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try{
            await storeData(firstName, lastName, username, hashedPassword);
            res.redirect('/');
        } catch (err) {
            return next(err);
        }
    });
});


module.exports = { signupRouter };