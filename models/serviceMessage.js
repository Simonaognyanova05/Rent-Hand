const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceMessageSchema = new Schema({
    serviceId: { type: mongoose.Schema.Types.ObjectId },
    senderId: { type: mongoose.Schema.Types.ObjectId },
    message: { type: String, required: true },
}, { timesmaps: true });

const ServiceMessage = mongoose.model('ServiceMessage', serviceMessageSchema);

module.exports = ServiceMessage;