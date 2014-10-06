var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var saleSchema = new mongoose.Schema({
    offerId: {
        type: Schema.ObjectId,
        ref: 'Offer',
        required: true
    },
    buyerId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    saleDate: { type: Date, required: true }
});

var SaleData = mongoose.model('Sale', saleSchema);

module.exports = SaleData;