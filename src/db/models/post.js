'use strict';
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
});

postSchema.pre('validate', function(next) {
    if (this.isNew) {
        this.updated = Date.now()
        next();
    }
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;