require('dotenv').config();

const nodemailer = require('nodemailer');
const router = require('./messages');
const { emit } = require('nodemon');
// const log = console.log;

// console.log("MY_CRED:"+process.env.username); 
//  console.log("MY_CRED:"+process.env.password); 
 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:  process.env.username, 
        pass:  process.env.password
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
                return res.send('An error occured');
            }
            return res.send('Email sent successfully');
        })
    )
})

module.exports = router;