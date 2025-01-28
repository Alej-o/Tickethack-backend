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
          return res.json({ result: false, error: 'CART not found' });
        }
        return Booking.create({ cart: cartData._id });
      })
      .then(newBookingItem => {
        return Booking.findById(newBookingItem._id)
          .populate('cart'); 
      })
      .then(populatedBookingItem => {
        res.json({ result: true, booking: populatedBookingItem });
      })
  });
  
  





module.exports = router;