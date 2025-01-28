var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
require('../models/connection');
const Trip = require('../models/trips');


router.post('/', (req, res) => {
  if (req.body.departure.trim() === '' || req.body.arrival.trim() === '') {
      return res.json({ result: false, error: 'Trips not found' });
  }
  Trip.find({ 
      departure: req.body.departure, 
      arrival: req.body.arrival, 
      date: req.body.date
  }).then(data => {
      if (!data) {
          return res.json({ result: false, error: 'Trips not found' });
      }

      res.json({result: true, allTrips: data});
  })
});

module.exports = router;
