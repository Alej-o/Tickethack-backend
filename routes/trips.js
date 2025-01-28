var express = require("express");
var router = express.Router();
// const fetch = require("node-fetch");
const Trip = require('../models/trips');
// const Cart = require('../models/Cart');

//Pour afficher tous les trajets
router.get('/', (req, res) => {
  if (!req.body.departure || !req.body.arrival || !req.body.date) {
    return res.json({ result: false, error: 'Trips not found' });
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
      if (!data || data.length === 0) {
          return res.json({ result: false, error: 'Trips not found' });}
    res.json({result: true, allTrips: data});
  })
});

router.post("/:id", (req, res) => {
  City.findbyId({ cityName: req.params.cityName}).then(city => {
    if (city) {
      res.json({ result: true, weather: city });
    } else {
      res.json({ result: false, error: "City not found" });
    }
  });
});

module.exports = router;
