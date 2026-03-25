const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    location: String,

    availableTimes: [
        {
            date: Date,
            booked: {
                type: Boolean,
                default: false
            }
        }
    ],

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;