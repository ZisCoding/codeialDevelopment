//  require the library
const mongoose = require('mongoose');

// mongoose.set('strictQuery', true);

//  connecting to database
async function connection() {
 
    try{
        return  await mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');
    }
    catch(err)
    {
        throw err ;
    }
    
    
}

// storing the conenction in db var to use db
const db = connection();

// print success on successfully connection otherwise error
db
    .then((data) => console.log('Connected to db Successfully!')) // This code will not be executed if an error occurs
  .catch((error) => console.error('error',error));

  module.exports = db;