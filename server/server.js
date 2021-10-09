const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const apiRouter = require('./routes/apiRouter');

//Connect to database
async function main() {
  await mongoose.connect('mongodb+srv://jackie_whitworth:uPM5VjAptv1bTOMO@cluster0.a2f06.mongodb.net/booklist?retryWrites=true&w=majority')
  console.log('connected to books database');
}
main().catch(err => console.log(err));



app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Serve static assets
// app.use(express.static(path.join(__dirname, '../')))
app.use(express.static('client'))
app.use(express.static('server'))


app.use('/api', apiRouter);

//Initiate server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});