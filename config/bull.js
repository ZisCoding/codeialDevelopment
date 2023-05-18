// importing bull for delayed jobs
const Queue = require('bull');

// creating a new queue for email jobs and connecting it to the remote redis server 
const emailQueue = new Queue('Emails', { redis: { port: 11490, host: 'redis-11490.c301.ap-south-1-1.ec2.cloud.redislabs.com', password: 'yUHeqELq083gjKf7en4E34jIrSJP2qaW' } }); // Specify Redis connection using object

// exporting emailQuue in an object becuase we can have more queue
module.exports = {
    emailQueue: emailQueue
};