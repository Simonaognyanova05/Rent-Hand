const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    category: String,
    title: String,
    description: String,
    price: Number,
    location: String,
    img: String,

    availableTimes: [
        {
            date: Date,
            booked: {
                type: Boolean,
                default: false
            },
            email: String,
            message: String,
            userId: String,
            status: {
                type: String,
                default: "pending"
            }
        }
    ],

    messages: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            email: String,

            conversation: [
                {
                    sender: String, 
                    message: String,
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ]
        }
    ],

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;