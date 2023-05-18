const queues = require('../config/bull');

const commentsMailer = require('../mailer/comment_mailer');

// processing the jobs pending in the email queue 
queues.emailQueue.process(function(job,done){

    commentsMailer.newComment(job.data.object);
    
    done();
});