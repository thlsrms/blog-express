'use strict';
const express = require('express');
const path = require('path');
require('./db/mngdbconnect');

const postRouter = require('./routers/post');
const Post = require('./db/models/post');

const port = process.env.PORT || 3000;
// express app
const app = express();

// listen for requests
app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Listening to port ${port}`);
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// endpoints
app.get('/', async (req, res) => {
    await Post.find({}).then((posts) => {
        posts.sort((elemA, elemB) => elemA.updated < elemB.updated ? 1 : -1);
        res.render('index', { posts: posts });
    });
});

app.get('/new', async (req, res) => {
    res.render('new');
});

// routing
app.use('/api', postRouter);

// 404
app.use((req, res) => {
    res.status(404).render('404');
});

process.on('SIGINT', () => process.exit(1));