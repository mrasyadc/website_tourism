const e = require('express');
const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
const provinsi = require('./provinsi')
dotenv.config();


const port = process.env.PORT || 8000;
app.use(express.urlencoded({extended : true}))
app.use(express.json())

// using ejs
app.set('view engine', 'ejs');

// fetch json

async function getJsonfromURL(url){
    try{
        const response = await axios.get(url)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}

app.get('/', async (req, res) => {
    const name = req.query.name || 'Guest';
    const title = 'Home';
    const home = true;
    const provinsi = await getJsonfromURL(process.env.provinsi_json_url);
    res.locals.home = home;
    res.render('home',
    {name,title,provinsi});
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

app.get('/category/:nama_kategori', (req, res) => {
    const title = 'Category';
    const category = req.params.nama_kategori;
    const home = true;
    if (!(category == 1||category == 2)){
        return res.status(404).send('Not found');
    }
    res.locals.home = home;
    res.render('category', {title,category});
});

app.get('/tempat-wisata/:id', async (req, res) => {
    const title = `${req.params.id}`;
    const home = false;
    res.locals.home = home;
    res.render('tempatwisata/_id/index',{title});
});

app.get('/test', async(req, res) => {
    const title = 'Test';
    const bali = await getJsonfromURL(process.env.bali_json);
    let name_place;
    const bali_filtered = Object.entries(bali.places).filter(([key, value]) =>{
        return value.name == 'Mount Batur'
    });
    console.log(bali_filtered);
    res.send('berhasil');
});

app.get('/test2', async(req, res) => {
    const title = 'Test';
    const provinsi_param = req.query.provinsi;
    console.log(provinsi_param);
    const provinsi_filtered = Object.entries(provinsi).filter(([key, value]) =>{
        return value.nama == provinsi_param
    });
    console.log(provinsi_filtered);
    const bali = await getJsonfromURL(provinsi_filtered[0][1].url);
    const bali_filtered = Object.entries(bali.places).filter(([key, value]) =>{
        return value.name == req.query.name
    });
    console.log(bali_filtered);
    res.send('berhasil');
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

