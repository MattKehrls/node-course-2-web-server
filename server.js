const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); //Sets up the view engine installed by NPM 'hbs'
app.use(express.static(__dirname + '/public')); //Must include file type in URL to hit the page

hbs.registerHelper('getCurrentYear', () => {//Helpers are for running functions to recieve data back and use it in a template, by calling the name of the helper.
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {//Pass data to a helper by adding a space after you call the name.(See Footer.hbs)
    return text.toUpperCase();
})

app.use((req, res, next) => { //app.use is how you register "middleware", next tells the middleware when its finished,handlers(app.get()) wont fire if not called! logs server log into a file when the app gets "used"
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintance.hbs');
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'The Home Page',
        welcomeMessage: 'The body of the page',
        currentYear: new Date().getFullYear()
    });
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Matt',
    //     likes : [
    //         'Videos Games',
    //         'Coding'
    //     ]
    // });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'There has been an error!!!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});