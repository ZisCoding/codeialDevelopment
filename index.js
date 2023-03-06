// importing express after installing it through npm install express
const express = require('express');
//importing the cookie parser after intalling
const cookieParse = require('cookie-parser')
// firing express server
const app = express();
// declaring the port where we want our server to listen rquest 
const port = 8000;
// importing express-ejs-layouts after installing it through ejs
const expressLayouts = require ('express-ejs-layouts');
//importing mongoose 
const db= require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParse());

// defining where to look for statics files css,js
app.use(express.static('./assets'));


// telling express server to use expressLayouts we have to put it b4 route
app.use(expressLayouts);

//extracting style and script from sub pages and putting it into the correct place in the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// this is a middleware which tells the server to go at './routes/index' for any route starting with '/'
app.use('/',require('./routes/index'));


// setting the view engine as ejs
app.set('view engine', 'ejs');
// setting the path where to find views
app.set('views','./views');

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