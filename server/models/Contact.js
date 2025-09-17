const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactShema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, minlength: 10, maxlength: 20, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", ContactShema);
