const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/octopics", {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log("Conected.");
}).catch(err => console.log(err));

app.get('/', (req, res) => {
   res.json({});
});

module.exports = app;