const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT ? process.env.PORT : 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('bmi');
});

app.post('/', (req, res) => {
    console.log(req.body);
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);
    let result = Math.round(weight / Math.pow((height / 100), 2) * 10) / 10;
    let resultStr = `Your BMI Result is: ${result}`;

    res.render('bmi', {bmi: resultStr}); // first 'bmi' refers to bmi.pug; second bmi refers to '= bmi' inside the pug file
});

app.listen(port, () => {
    console.log(`The server is running on port: ${port}.`);
});