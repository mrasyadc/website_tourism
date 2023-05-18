const e = require('express');
const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
app.use(express.urlencoded({extended : true}))
app.use(express.json())

// using ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const name = req.query.name || 'Guest';
    const title = 'Home';
    const home = true;
    res.locals.home = home;
    res.render('home',
    {name,title});
});
app.get('/about', (req, res) => {
    const title = 'About';
    const home = false;
    res.locals.home = home;
    res.render('about', {title});
});

app.get('/register', (req, res) => {
    const title = 'Register';
    res.render('register', {title});
});

app.get('/signin', (req, res) => {
    const title = 'Login';
    res.render('signin', {title});
});

app.get('/category', (req, res) => {
    const title = 'Category';
    const home = false;
    res.locals.home = home;
    res.render('category', {title});
});

// app.get('/api/v1/books/:id', (req, res) => {
//     console.log("Books.id",req.params.id);
//     res.send(`Book ${req.params.id}`);
//     });

// app.get('/api/v1/books', (req, res) => {
//     // console.log(req.query.author);
//     // res
//     // .status(200)
//     // .send(`Author is ${req.query.author}`);
//     // });



const BOOK_MSG = 'Book created successfully';

// app.post('/api/v1/books', (req, res) => {
//     console.log(req.body.author);
//     res.status(201).send(BOOK_MSG);
//     });

app.use('/' , (req, res) => {
    res.status(404).send('Not found');
    res.send('not found');
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    });

