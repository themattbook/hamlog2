const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    callsign: {
        type: String,
        required: true,
        min: 6
    },
    toCallsign: {
        type: String,
        required: true,
        max: 7,
        min: 6
    },
    band: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    comments: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Contact', contactSchema);