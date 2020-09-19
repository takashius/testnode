const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.post('/', async (req, res) => {
    console.log("Se conecto");
})

var app = express();

app.use(router);
app.use("/", express.static('public'));


app.listen(3000, function(){
    console.log('La app esta escuchando en 3000');
});
