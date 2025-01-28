const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Trip = require('../models/Trip');

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
router.post('/:id', (req, res) => {
  if (!req.params.id) {
    return res.json({ result: false, error: 'Missing trip ID' });
  }

  Trip.findById(req.params.id)
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
    Cart.find().then(carts => {
      res.json({ allCart: carts });
    });
  });

module.exports = router;