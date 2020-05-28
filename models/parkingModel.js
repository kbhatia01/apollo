const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let parkingSchema = new Schema({
    vehicle_number: { type: String, required: true },
    type: { type: String, enum: { values: ["SUV", "HatchBack","TwoWheeler"], message: "type must be SUV, HatchBack,TwoWheeler" }, required: true },
    lotName: { type: String,enum: { values: ["PVR", "INOX"], message: "lotName must be PVR,INOX"},required: true },
    area: {type: Number, required: true},
    start_time:{type:String,required: true},
    end_time:{type:String},
    price:{type:Number,default:0}
}, {
    versionKey: false
});
const parkinglot = mongoose.model('parkinglot', parkingSchema);
// make this available to our users in our Node applications
module.exports = parkinglot;