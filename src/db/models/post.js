'use strict';
const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,

    },
    author: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        required: true,
    }
}));

module.exports = Post;