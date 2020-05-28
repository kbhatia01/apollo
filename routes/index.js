var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const parkingModel = require("../models/parkingModel")
const areaModel = require("../models/AreaModel")
var moment = require('moment');
const config = require('../config/index')['devo']
require('moment-precise-range-plugin');

//get vehicle details
router.get('/vehicle/:vehicle_id', function (req, res, next) {
  parkingModel.find({ vehicle_number: req.params.vehicle_id }).sort([['price', 'ascending']]).then(result => {
    if (result)
      return res.status(200).json(result).end();

    res.status(404).json({ "result": "wrong Vehicle Number" });
  }).catch(err => {

    res.status(400).json({
      "status": "failure",
      "reason": err.message
    });
  })

});

// create a parking
router.post("/parking", async function (req, res, next) {

  if (!req || !req.body || !req.body.area || !req.body.lotName || !req.body.type) {
    return res.status(400).json({
      "status": "failure",
      "reason": "body required with area,type and lotName"
    }).end()
  }
  // add start time 
  req.body.start_time = new Date();
  //check if areqa is present or created
  let areaModels = await areaModel.findOne({ area: req.body.area, type: req.body.type, lotName: req.body.lotName });
  if (!areaModels || areaModels.available != 1) {
    return res.status(400).json({ response: "Invalid Area or area filed Up" }).end();
  }
  let parking = new parkingModel(req.body);
  updateArea(0, req.body.area,req.body.lotName)
  //save it on mongo
  parking.save(function (err, resp) {
    if (err) {
      return res.status(400).json({
        "status": "failure",
        "reason": err.message
      }).end();
    }
    resp = resp.toObject()
    resp.id = (resp._id)
    delete resp._id
    res.status(201).json(resp);
  })

})

//calculate price by ending the time
router.get("/end/:parking_id", async function (req, res) {
  try {
    let id = mongoose.Types.ObjectId(req.params.parking_id)
    let data = await parkingModel.findOne({ _id: id, price: 0 });

    if (!data)
      return res.status(401).json({ reason: "Action already taken or invalid id" }).end();

    let end_time = moment(new Date());
    let time_diff = moment.preciseDiff(end_time, moment(new Date(data.start_time)), true);
    let price = getPrice(data.type, time_diff, data.lotName)
    //make space available again
    updateArea(1, data.area,data.lotName);
    //update user details
    parkingModel.updateOne({ _id: id }, { end_time, price }, { runValidators: true }).then(result => {
      res.status(202).json({
        time: time_diff,
        price
      })
    })
  }
  catch (err) {
    res.status(400).json({
      "status": "failure",
      reason: err.message
    });
  }
});
//create area
router.post("/area", function (req, res, next) {
  if (!req || !req.body) {
    return res.status(400).json({
      "status": "failure",
      "reason": "body required"
    }).end()
  }
  let area = new areaModel(req.body);
  area.save(function (err, resp) {
    if (err) {
      return res.status(400).json({
        "status": "failure",
        "reason": err.message
      }).end();
    }
    resp = resp.toObject()
    resp.id = (resp._id)
    delete resp._id
    res.status(201).json(resp);
  });
})

// get price from this funtion
function getPrice(type, time, lot) {
  return time.hours * config.PriceList[lot][type].Hour + time.days * config.PriceList[lot][type].Day + time.months * config.PriceList[lot][type].Month + time.minutes * config.PriceList[lot][type].Minute
}

//change area state from unavailable to available
async function updateArea(available, area,lotName) {
  console.log(area,available)
  return await areaModel.updateOne({ area, lotName}, { available }, { runValidators: true }).then(res=>{
    console.log(res)
  }).catch(err => {
    return err;
  });
}
module.exports = router;
