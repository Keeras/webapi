
const mongoose = require('mongoose');

const herosSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    }
}, { timestamps: true });
const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    heros: [herosSchema],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });


module.exports = mongoose.model('Hero', heroSchema);