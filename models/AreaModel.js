const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let areaScheme = new Schema({
    area: { type: String, required: true },
    available: { type: Number, default: 1 },
    lotName: { type: String, enum: { values: ["PVR", "INOX"], message: "lotName must be PVR,INOX" }, required: true },
    type: { type: String, enum: { values: ["SUV", "HatchBack", "TwoWheeler"], message: "type must be SUV, HatchBack,TwoWheeler" }, required: true }
}, {
    versionKey: false,
    strict: false
});

areaScheme.index({ "area": 1, "lotName": 1, type: 1 }, { "unique": true });
const area = mongoose.model('area', areaScheme);
// make this available to our users in our Node applications
module.exports = area;