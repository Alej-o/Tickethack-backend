const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Trip = require('../models/trips');

//Pour supprimer un trajet dans le panier en fonction de l'id
router.delete("/:id", (req, res) => {
    Cart.findByIdAndDelete(req.params.id).then(trip => {
      if (trip) {
        res.json({ result: true, trips: trip });
      } else {
        res.json({ result: false, error: "Trip not found" });
      }
    });
  });

// Pour ajouter un element dans le panier en fonction de l'id
router.post('/save', (req, res) => {
  if (!req.body.id) {
    return res.json({ result: false, error: 'Missing trip ID' });
  }

  Trip.findById(req.body.id)
    .then(tripData => {
      if (!tripData) {
        return res.json({ result: false, error: 'Trip not found' });
      }
      const newCartItem = new Cart({
        departure: tripData.departure,
        arrival: tripData.arrival,
        date: tripData.date,
        price: tripData.price,
      });

      return newCartItem.save();
    })
    .then(newCartItem => {
      res.json({ result: true, cart: newCartItem });
    });
});

//Afficher tout ton panier
router.get("/", (req, res) => {
    Cart.find().then(data => {
      res.json({ cart: data });
    });
  });

module.exports = router;