'use strict';
const express = require('express');
const Post = require('../db/models/post');
const router = new express.Router();

/* router.get('/all', async (req, res) => {
    await Post.find({})
        .then((data) => {
            res.status(201).send(data);
        });
}); */

router.get('/:id', async (req, res) => {
    await Post.findById(req.params.id,)
        .then((post) => {
            res.render('post', { post: post });
        }).catch((err) => res.status(500).send(err));
});

router.post('/write', async (req, res) => {
    let newBlogPost = new Post(req.body.post);

    await Post.find({ title: newBlogPost.title }).then(async (posts) => {
        if (posts.length > 0) {
            res.status(304).send('Post already exists');
        } else {
            await newBlogPost.save().then((posts) => res.redirect('/'));
        }
    }).catch((err) => res.status(400).send(err));
});

module.exports = router;