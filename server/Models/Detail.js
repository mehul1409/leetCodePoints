const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    easy: {
        type: Number,
        required: true,
    },
    medium: {
        type: Number,
        required: true,
    },
    hard: {
        type: Number,
        required: true,
    },
    questionNumbers: {
        type: [Number],
        required: true,
    },
    totalPoints: {
        type: Number,
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const DetailModel = mongoose.model("Detail", detailSchema);
module.exports = DetailModel;
