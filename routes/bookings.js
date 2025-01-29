const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Cart = require('../models/carts');
// const Trip = require('../models/trips');
const Booking = require('../models/bookings');

//Pour ajouter les achats
router.post('/save', (req, res) => {
  const cartId = req.body.id;
  if (!cartId) {
    return res.json({ result: false, error: 'Missing cart ID' });
  }
  Cart.findById(cartId)
    .then(cartData => {
      if (!cartData) {
        return res.json({ result: false, error: 'Cart not found' });
      }   
      return Booking.create({ 
        cart: cartData._id,
        trip: cartData.trip})
        .then(newBookingItem => {
        return Cart.findByIdAndDelete(cartId)
        .then(() => newBookingItem);
      });
    })
    .then(newBookingItem => {
      return Booking.findById(newBookingItem._id)
        .populate('trip');
    })
    .then(populatedBookingItem => {
      res.json({ result: true, booking: populatedBookingItem });
    })
});
  
// Tous les achats
  router.get("/", (req, res) => {
    Booking.find().then(data => {
      res.json({ booking: data });
    });
  });

module.exports = router;