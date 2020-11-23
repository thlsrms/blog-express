'use strict';
const express = require('express');
const Post = require('../db/models/post');
const router = new express.Router();

router.get('/posts', async (req, res) => {
    await Post.find({})
        .then((data) => {
            res.status(201).send(data);
        });
});

router.post('/posts/write', async (req, res) => {
    let timeAndDateNow = Date.now();
    /* TODO: FIND A BETTER WAY TO DO THIS: */
    let newBlogPost = new Question();
    newBlogPost.title = req.body.post.title;
    newBlogPost.content = req.body.post.content;
    newBlogPost.author = req.body.post.author;
    newBlogPost.updated = timeAndDateNow;
    /* --------------------------------------- */

    await Post.find({ title: newBlogPost.title }).then(async (posts) => {
        if (posts.length > 0) {
            res.status(304).send('Question already exists');
        } else {
            await newQuestion.save().then((posts) => res.status(201).send(posts));
        }
    }).catch((err) => res.status(400).send(err));
});

router.get('/posts/search', async (req, res) => {
/*  await Question.find({ name: { $regex: req.query.search, $options: 'i' } })
    .then( (data) => {
        res.render()
    }); */
});

router.patch('/posts/:id', async (req, res) => {
    await Post.update();
});

router.delete('/posts/:id', async (req, res) => {
    await Post.delete();
});

module.exports = router;