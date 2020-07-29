const express = require('express');
const router = express.Router();
require('dotenv').config();
const Messages = require('../models/Pre-msg');


const API_KEY = process.env.API_KEY;
const UserName = process.env.username;
const credentials = {
    apiKey: `${API_KEY}`,
    username: `${UserName}`
}

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

// function to send SMS
function sendMessage(tel_number, smsMessage) {
    const options = {
        // Set the numbers you want to send to in international format
        to: tel_number,
        // Set your message
        message: smsMessage,
        // Set your shortCode or senderId
        // from: 'XXYYZZ'
    }

    // That’s it, hit send and we’ll take care of the rest
    sms.send(options)
        .then(console.log)
        .catch(console.log);
}

// send multiple SMS
router.post('/send_sms/multiple', (req, res) => {
    const {subject, tel_number}=req.body;

    Messages.findOne({name:subject}).then( result =>{
        if(result){
            // res.json(result);
            smsMessage = result.message
            console.log(smsMessage);
            sendMessage(tel_number,smsMessage);
            res.status(200).send('Message sent successfully');
        }else{
            res.status(404).send('No such predefined message')
        }
    })


});


// send single SMS
router.post('/send_sms/single', (req, res) => {
    const {subject, tel_number}=req.body;

    Messages.findOne({name:subject}).then( result =>{
        if(result){
            smsMessage = result.message
            sendMessage(tel_number,smsMessage);
            res.status(200).send('Message sent successfully');
        }else{
            res.status(404).send('No such predefined message')
        }
    })
});





module.exports = router;