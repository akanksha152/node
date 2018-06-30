const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname+'/views/partials');
//run partils using node server.js -e js,hbs(//extensions)
//middleware are called in the way we call app.use


hbs.registerHelper('getCurrentyear', () => {
    return 2016;
});
hbs.registerHelper('screamIt', (text1, text2) => {
    console.log(text1);
    return text1 + 'finally scream it cALLED';
});
app.use(express.static(__dirname+'/public'));


app.use((req, res, next)=> {
    //everything which comes from client is avaialble in req object
    console.log(`${req.method}, ${req.url}`)
    next();
})

app.set('view engine', 'hbs');
//templating engine help u to render html pages but in dynamic way, can create reusable markup
//handlebar is a view engine for express, other are ejs or pug 

//handler for http get request
app.get('/', (req, res) => {
    // res.send('hello Express!');
    res.render('home.hbs', {
        name: 'Andrew',
        likes: [
            'Biking',
            'citis'
        ],
        welcomeMessage: 'welcome to home',
        getCurrentyear: 2015
    })
});

app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        getCurrentyear: 2017
    });
})

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'somthing happend'
    })
} )

app.listen(port, () => {
    console.log(`server is up on port: ${port}`);
});


//git
//ssh -key list  ls -al ~/.ssh
//ssh-keygen -t rsa -b 4096 -C 'akanksharma152@gmail.com'
// eval "$(ssh-agent -s)"  --to get process id
//ssh-add ~/.ssh/id_rsa
// pbcopy < ~/.ssh/id_rsa
//copy to githun ssh -key
//ssh -T git @github.com ===for authentication
//heroku login
//heroku keys:add  -- to add ssh keys to heroku
//ssh  -v git@heroku.com (authetication succeed , now we are gud to go)