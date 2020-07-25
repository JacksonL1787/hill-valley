const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    eventID: String,
    eventName: String,
    startHour: Number,
    startMinute: Number,
    endHour: Number,
    endMinute: Number,
    month: Number,
    year: Number,
    day: Number,
    startAMPM: String,
    endAMPM: String,
    eventDesc: String
});

const event = mongoose.model('event', EventSchema);

module.exports = event;