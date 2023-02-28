// importing express after installing it through npm install express
const express = require('express');
// firing express server
const app = express();
// declaring the port where we want our server to listen rquest 
const port = 8000;

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