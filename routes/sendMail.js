require('dotenv').config();

const nodemailer = require('nodemailer');
const router = require('./messages');
const { emit } = require('nodemon');
const log = console.log;


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:  'agwenchez254@gmail.com', 
        pass:  'XXXXXX'
    }
});









router.post( '/sendMail', (req,res)=>{
const {email,subject, message} = req.body;

    let mailOptions = {
        from: 'agwenchez254@gmail.com', 
        to: email,
        subject: subject,
        text: message
    };
    res.send(
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return log('Error occurs');
            }
            return log('Email sent!!!');
        })
    )
})

module.exports = router;