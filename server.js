const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

console.log("MY_CRED:"+process.env.API_KEY);
console.log("MY_CRED:"+process.env.username);

// Body parser middleware
app.use(express.json({ extended:false}));

// DB Config
const db = 'mongodb://localhost:27017/newwell';

app.get('/', (req,res)=>{
  res.send('route works fine')
})

// serve static files
// app.use(express.static(path.join(__dirname,'public')));

// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


 
  
const port = process.env.PORT || 4000;
app.use('/mailer',require('./routes/sendMail'))
app.use('/messages',require('./routes/messages'));

app.listen(port, () => console.log(`Server running on port ${port}`));
