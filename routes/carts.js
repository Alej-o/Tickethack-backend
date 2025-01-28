const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Cart = require('../models/carts');
const Trip = require('../models/trips');

//Pour supprimer un trajet dans le panier en fonction de l'id
router.delete("/:id", (req, res) => {
  Cart.findByIdAndDelete(req.params.id)
    .then(deletedCart => {
      if (!deletedCart) {
        return res.json({ result: false, error: "Cart item not found" });
      }
      res.json({ result: true });
    })
});
  // Pour ajouter un element dans le panier en fonction de l'id
  router.post('/save', (req, res) => {
    const tripId = req.body.id;
    if (!tripId) {
      return res.json({ result: false, error: 'Missing trip ID' });
    }
    Trip.findById(tripId)
      .then(tripData => {
        if (!tripData) {
          return res.json({ result: false, error: 'Trip not found' });
        }
        return Cart.create({ trip: tripData._id });
      })
      .then(newCartItem => {
        return Cart.findById(newCartItem._id).populate('trip');
      })
      .then(populatedCartItem => {
        res.json({ result: true, cart: populatedCartItem });
      })
  });
  

//Afficher tout ton panier
router.get("/", (req, res) => {
    Cart.find().then(data => {
      res.json({ cart: data });
    });
  });

module.exports = router;