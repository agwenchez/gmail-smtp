require('dotenv').config();

const nodemailer = require('nodemailer');
const router = require('./messages');
const Messages = require('../models/Pre-msg');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'agwenchez254@gmail.com',
        pass: process.env.password
    }
});



// send a single mail with a predefined message
router.post('/sendMail/single', (req, res) => {
    const { name, email, subject} = req.body;


Messages.findOne({name:subject}).then( result =>{
    if(result){
        transporter.sendMail(
            {
                from: 'agwenchez254@gmail.com',
                to: email,
                subject: `${result.name}`,
                html: ` <p>Dear ${name},
                    ${result.message}</p>`
            },
    
            (error, info) => {
                if (error) {
                    return console.log(error);
                }
    
                res.send({ msg: 'Email has been sent' });
            });
    }else{
        res.send('No such predefined message found')
    }
})

  

})




// send multiple mails with a predefined message
router.post('/sendMail/multiple', (req, res) => {
    const { email, subject} = req.body;
    

Messages.findOne({name:subject}).then( result =>{
    if(result){
        transporter.sendMail(
            {
                from: 'agwenchez254@gmail.com',
                to: email,
                subject: `${result.name}`,
                html: ` <p>Dear esteemed artist,
                    ${result.message}</p>`
            },
    
            (error, info) => {
                if (error) {
                    return console.log(error);
                }
    
                res.send({ msg: 'Emails have been sent' });
            });
    }else{
        res.send('No such predefined message found')
    }
}).catch(err => res.status(404).json({sucees:false}));

})

module.exports = router;