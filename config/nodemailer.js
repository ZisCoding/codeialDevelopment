const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// creating the tranporter funtion to tranfer mails
let transporter = nodemailer.createTransport({
    // the mail service provider where the email server is hosted
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: { // credentials of the account we are  using to send email
        user: 'cole95@ethereal.email',
        pass: 'Sj9AYEPCygWm21pY2p'
    }
});
// this function will render the ejs templates in html format for emails which are defined insdie views/mailers
let renderTemplate = (data , relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("error in rendering template",err); return;
            }

            mailHTML=template
            
        }
    )
    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}



