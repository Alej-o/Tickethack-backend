const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts', required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'trips', required: true }
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;