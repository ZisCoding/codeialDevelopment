const nodeMailer =  require('../config/nodemailer');

// this will send a mail to the whernever a comment will be created to the person who is created the comment this funtion is called from the comment controller after the comment gets created 
exports.newComment = async (comment)=>{

    try{
        let info = await nodeMailer.transporter.sendMail({
            from: 'zishan@codeail.com',
            to: comment.user.email,
            subject: "New comment published",
            html: '<h1>Yuh, Comment Published</h1>'
        });
        console.log("Email sent ");
    }catch(error){
        console.log("Error in sending email",error);
    }
   
}



