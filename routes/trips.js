const mongoose = require('mongoose');
var express = require("express");
var router = express.Router();
const Trip = require('../models/trips');
// const Cart = require('../models/Cart');

//Pour afficher tous les trajets
router.get('/', (req, res) => {
 
  if (!req.query.departure || !req.query.arrival || !req.query.date) {
    return res.json({ result: false, error: 'Missing parameters' });
  }

  const startDay = new Date(req.query.date);
  const endDay = new Date(req.query.date);
  endDay.setHours(23, 59, 59, 999);

  Trip.find({
    departure: req.query.departure,
    arrival: req.query.arrival,
    date: { $gte: startDay, $lte: endDay }
  })
  .then(data => {
    if (data.length === 0) {
      return res.json({ trips: null }); 
    }
    res.json({ trips: data }); 
  });
});


module.exports = router;
