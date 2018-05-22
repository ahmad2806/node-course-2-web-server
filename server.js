
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url} `;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('err')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintains.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express is Here</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        wellcomeMsg: 'wellcome to my website'
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'cant load the page error 404'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
});