'use strict';
const express = require('express');
const Post = require('../db/models/post');
const router = new express.Router();

router.get('/all', async (req, res) => {
    await Post.find({})
        .then((data) => {
            res.status(201).send(data);
        });
});

router.get('/:id', async (req, res) => {
    await Post.findById(req.params.id,)
        .then((post) => {
            res.render('post', { post: post });
        }).catch((err) => res.status(500).send(err));
});

router.post('/write', async (req, res) => {
    let timeAndDateNow = Date.now();
    /* TODO: FIND A BETTER WAY TO DO THIS: */
    let newBlogPost = new Post();
    newBlogPost.title = req.body.post.title;
    newBlogPost.content = req.body.post.content;
    newBlogPost.author = req.body.post.author;
    newBlogPost.updated = timeAndDateNow;
    /* --------------------------------------- */
    await Post.find({ title: newBlogPost.title }).then(async (posts) => {
        if (posts.length > 0) {
            res.status(304).send('Post already exists');
        } else {
            await newBlogPost.save().then((posts) => res.redirect('/'));
        }
    }).catch((err) => res.status(400).send(err));
});

/* router.get('/search', async (req, res) => {
 await Post.find({ name: { $regex: req.query.search, $options: 'i' } })
    .then( (data) => {
        res.render()
    });
});

router.patch('/:id', async (req, res) => {
    await Post.update();
});

router.delete('/:id', async (req, res) => {
    await Post.delete();
}); */

module.exports = router;