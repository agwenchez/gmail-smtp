const express = require('express');
const router = express.Router();
require('dotenv').config();



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

// send a single SMS
router.post('/send_sms/single', (req, res) => {
    const {tel_number,smsMessage}=req.body

    sendMessage(tel_number,smsMessage);
    res.status(200).send('Message sent successfully');


});






module.exports = router;