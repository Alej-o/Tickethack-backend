const mongoose = require('mongoose');
var express = require("express");
var router = express.Router();
// const fetch = require("node-fetch");
const Trip = require('../models/trips');
// const Cart = require('../models/Cart');

//Pour afficher tous les trajets
router.get('/', (req, res) => {
  if (!req.body.departure || !req.body.arrival || !req.body.date) {
    return res.json({ result: false, error: 'Missing parameters' });
  }

  const startDay = new Date(req.body.date); 
  const endDay = new Date(req.body.date);
  endDay.setHours(23, 59, 59, 999); 

  Trip.find({ 
    departure: req.body.departure, 
    arrival: req.body.arrival, 
    date: { $gte: startDay, $lte: endDay }
  })
  .then(data => {
    if (data.length === 0) {
      return res.json({ result: false, error: 'Trips not found' });
    }
    res.json({ result: true, trips: data });
  });
});


module.exports = router;
