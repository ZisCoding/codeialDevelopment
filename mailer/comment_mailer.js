const nodeMailer =  require('../config/nodemailer');

// this will send a mail to the whernever a comment will be created to the person who is created the comment this funtion is called from the comment controller after the comment gets created 
exports.newComment = async (comment)=>{
    

    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    
    try{
        let info = await nodeMailer.transporter.sendMail({
            from: 'zishan@codeial.com',
            to: comment.user.email,
            subject: "New comment published",
            html: htmlString
        });
        console.log("Email sent ");
    }catch(error){
        console.log("Error in sending email",error);
    }
   
}



