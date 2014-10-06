var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offerSchema = new mongoose.Schema({
    seller: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    title: { type: String, required: true },
    pictureUrl: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    creationDate: { type: Date },
    expirationDate: { type: Date },
    sold: { type: Boolean, required: true },
    created: { type: Date }
});

var OfferData = mongoose.model('Offer', offerSchema);

module.exports = OfferData;