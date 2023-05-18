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
    res.render('home',
    {name,title,home});
});
app.get('/about', (req, res) => {
    const title = 'About';
    res.render('about', {title});
});

app.get('/users', (req, res) => {
    const pengguna = [
    {name: 'Arya', age: 20},
    {name: 'John', age: 25},
    {name: 'Sansa', age: 23}
    ]

    res.render('users', 
    {
    name : 'Arya',
    title:'Users Profile',
    pengguna,
    });
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
