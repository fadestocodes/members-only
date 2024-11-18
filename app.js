const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db/pool');
const bcrypt = require('bcryptjs');


const {indexRouter} = require('./routes/index');
const {signupRouter} = require('./routes/signUp');
const {loginRouter} = require('./routes/login');
const {logoutRouter} = require('./routes/logout');
const {joinclubRouter} = require('./routes/joinClub');
const {accountRouter} = require('./routes/account');
const {newMessageRouter} = require('./routes/newMessage');

app.use(express.urlencoded({extended : true}));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');


//----------------------Setup Passport----------------------------//

passport.use(
    new LocalStrategy(async (username, password, done) =>{
        try {
            const {rows} = await pool.query("SELECT * FROM members_only WHERE username = $1", [username]);
            const user = rows[0];
            if (!user) {
                return done (null, false, {message : "Incorrect username"});
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done (null, false, {message : "Incorrect password"});
            }
            return done (null, user);
        } catch (err) {
            return done (err);
        }
    })
);

passport.serializeUser((user,done) =>{
    done(null, user.user_id);
});
passport.deserializeUser( async (id, done) =>{
    try {
        const {rows} = await pool.query("SELECT * FROM members_only WHERE user_id = $1", [id]);
        const user = rows[0];
        done(null, user);
    } catch (err) {
        done (err);
    }
});

//----------------------Setup Routes----------------------------//
app.use(session({secret : 'cats', resave : false, saveUninitialized : false}));
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
});


app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/join-club', joinclubRouter);
app.use('/account', accountRouter);
app.use('/new-message', newMessageRouter);

const PORT = 3000;
app.listen(PORT, ()=>console.log(`Express App Listening on Port: ${PORT}`));