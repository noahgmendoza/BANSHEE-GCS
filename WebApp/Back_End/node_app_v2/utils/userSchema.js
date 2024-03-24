const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mavlinkDataSchema = new Schema({
    mavpackettype: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    autopilot: {
        type: Number,
        required: true
    },
    base_mode: {
        type: Number,
        required: true
    },
    custom_mode: {
        type: Number,
        required: true
    },
    system_status: {
        type: Number,
        required: true
    },
    mavlink_version: {
        type: Number,
        required: true
    },
}, { _id: false });

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mavlink_data: [{
        month: {
            type: String,
            required: true,
            enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        data: [mavlinkDataSchema]
    }]
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema, 'users');

