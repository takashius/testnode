const express = require('express');

var app = express();
app.use("/", express.static('public'));


app.listen(3000, function(){
    console.log('La app esta escuchando en 3000');
});
