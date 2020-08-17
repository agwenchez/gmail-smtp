const express = require('express');
const router = express.Router();
const Messages = require('../models/Pre-msg');


// default route
router.get('/',(req,res)=>{
    res.send('Predefined messages route works fine')
})

// create a new predefined message
router.post('/create-msg', (req,res)=>{

    const {name, category, message} =req.body;

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
                category,
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


// update a message
router.put('/update-msg/:id', (req,res)=>{

let messages = {};
const {name,category, message} =req.body;

messages.name = name;
messages.message = message;
messages.category = category;
Messages.updateOne({ _id: req.params.id}, messages,(err)=>{
if(err){
    throw err;
}else{
    return res.send('record updated successfully');
}
} )


})




// delete a predefined message
router.delete('/delete-msgs/:id', (req,res)=>{
    Messages.findById(req.params.id).then( result => {
        result.remove().then( ()=>res.send('deleted successfully'));
    }).catch(err => res.status(404).json({sucees:false}));
}) 

router.post('/update-messages/:id', (req,res)=>{
   
    const {name, message} =req.body;

    Messages.findByIdAndUpdate(req.params.id, {
        $set: {
           name,
           message
        }
    }, err=>{
        if(err){
            throw err;
        }else{
            return res.send('record updated successfully');
        }
        });

   
}) 



module.exports = router;