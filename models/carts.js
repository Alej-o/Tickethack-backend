const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'trips', required: true },
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;
