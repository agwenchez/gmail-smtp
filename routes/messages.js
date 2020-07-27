const express = require('express');
const router = express.Router();
// const Messages = require('../models/Pre-msg');


// default route
router.get('',(req,res)=>{
    res.send('Predefined messages route works fine')
})

// create a new predefined message
router.post('/create-msg', (req,res)=>{

    const {name, message} =req.body;

    Messages.findOne({
        name
    }).then(result => {
        if (result) {
            return res.status(400).json({
                msg: "Record already exists"
            })
        } else {
            // create new message
            const newMessage = new Messages({
                name,
                message
            })
            newMessage.save()
                .then(
                    result => {
                        res.status(200).json({msg:'Record saved successfully'});
                        console.log(result);
                    })
                    .catch(err => res.status(404).json({sucees:false}));


        }

    })
})

// fetch all messages
router.get('/msgs', (req,res)=>{
    Messages.find().then( result => {
        res.json(result);
    }).catch(err => res.status(404).json({sucees:false}));
})

// delete a predefined message
router.delete('/delete-msgs/:id', (req,res)=>{
    Messages.findById(req.params.id).then( result => {
        result.remove().then( ()=>res.send('deleted successfully'));
    }).catch(err => res.status(404).json({sucees:false}));
}) 


module.exports = router;