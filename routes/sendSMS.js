const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const { default: Axios } = require('axios');
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



// sending SMS to multiple numbers
router.post('/sendsms/multiple', (req, res) => {
    const {  phone_number } = req.body;

    

    Axios.get('http://localhost:3000/artists/artists').then( response=>{

        const data = response.data;
        console.log(data);
        
        const phone_numbers = data.map (item => item.phone_number);
        console.log(phone_numbers);

        const found = phone_numbers.find( element => element === phone_number);
        console.log(found);

        if(!found){
            return res.status(400).json({
                msg: "Kindly provide a phone number of a valid user"
            })
        }else{


		// initialize africastalking gateway
		const africastalking = require('africastalking')(credentials);

		// sms object of africastalking package
		const sms = africastalking.SMS;

		// sending parameters
		const sending_options = {
			to: phone_numbers,
			message: 'Some test message to see if this works fine'
		};

		// send sms
		// sms.send(sending_options)
		// 	.then(response => {
		// 		console.log(response);
		// 		res.send(response);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 		res.send(error);
		// 	});
		res.status(200).send('messages sent successfully')

         }


        }).catch(err => res.status(500).send('an error occured'))

});



module.exports = router;