const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        default: ''
    },
    tagline: {
        type: String,
        default: ''
    },
    body: {
        type: Array,
        default: []
    },
    categories: {
        type: Array,
        default: []
    },
    platforms: {
        type: Array,
        default: []
    },
    images: {
        type: Array,
        default: []
    },
    trailer: {
        type: String,
        default: ''
    },
    by: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    posted: {
        type: Date,
        default: Date.now
    }
});

NewsSchema.index({title: "text"})

module.exports = News = mongoose.model('news', NewsSchema);