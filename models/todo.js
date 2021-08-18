const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    userId: {
        type: String,
        required: true,
        ref:'User'
    },
})
module.exports = mongoose.model('Todo', todoSchema);