// importing express after installing it through npm install express
const express = require('express');
//importing the cookie parser after intalling
const cookieParse = require('cookie-parser')
// firing express server
const app = express();
// declaring the port where we want our server to listen rquest 
const port = 8000;
// requiring path
const path = require('path');
// importing express-ejs-layouts after installing it through ejs
const expressLayouts = require ('express-ejs-layouts');
//importing mongoose 
const db= require('./config/mongoose');
// requiring the session to work with passport and create session cookies
const session = require('express-session')
// requiring passport for authentication
const passport = require('passport');
// required the local passport strat which we defined
const passportLocal = require('./config/passport-local-strategy')
//requiring connect mongo to store our session cookies so that it wont get erased after restarting server
const MongoStore = require('connect-mongo');
// requring sass middleware
const sassMiddleware = require('node-sass-middleware');
// require connect falsh to show the flash messages
const flash = require('connect-flash')
// requiring out custom middleware
const customMware = require('./config/middleware');


// using sass middleware which compiles files written in sass to css
app.use(sassMiddleware({
    src: path.join(__dirname,'/assets/scss'), // where to look for scss files
    dest:  path.join(__dirname,'/assets/css'), // where to put file after compliling
    debug: false, // show error 
    outputStyle: 'extended',
    prefix:'/css'
}));



app.use(express.urlencoded());

app.use(cookieParse());

// defining where to look for statics files css,js
app.use(express.static(__dirname+'/assets'));
// any request coming with /uploads whould look for static files in " __dirname+'/uploads' "
app.use('/uploads/',express.static(__dirname+'/uploads'));

// telling express server to use expressLayouts we have to put it b4 route
app.use(expressLayouts);

//extracting style and script from sub pages and putting it into the correct place in the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// setting the view engine as ejs
app.set('view engine', 'ejs');
// setting the path where to find views
app.set('views','./views');

// using session as the middleware to encrypt the coookie
app.use(session({
    name: 'codeial', // definin name of cookie
    secret: 'blahsomething', // encryption key will change it later while production stage 
    saveUninitialized: false, 
    resave: false,
    cookie:{ 
        maxAge: (1000 * 60 * 100) // defining the age of cookie in mili sec after this user will automatically signed out
    },
    // storing seesion in mongoDB
    store: MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/codeial_development',
        autoRemove: 'disabled',
    })
}));

// telling the app to use passport
app.use(passport.initialize());
app.use(passport.session());

// we have to use flash after session and before routes beacuse it uses session
app.use(flash());
app.use(customMware.setFlash);

// this is a middleware which tells the server to go at './routes/index' for any route starting with '/'
app.use('/',require('./routes/index'));


// telling sever to listen at port 
async function listenRequest()
{
    return await app.listen(port);
}

listenRequest()
.then((data)=>{
    console.log(`server is up and running on port : ${port}`);
})
.catch((err)=>{
    console.log(`error in running the server:  ${err}`);
});