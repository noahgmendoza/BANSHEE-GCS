const mongoose = require('mongoose')
const Schema = mongoose.Schema

const batteryDataSchema = new Schema({
  batt_id: {
      type: Number,
      required: true
  },
  total_volt: {
      type: Number,
      required: true
  },
  volts: [{
      type: Number,
      required: true
  }]
}, { _id: false });

const rgsSchema = new Schema({
  location: {
      type: String,
      required: true
  },
  battery_data: [batteryDataSchema] // Directly embedding batteryDataSchema
}, { timestamps: true });

// Export the schema
module.exports = mongoose.model('rgs_details', rgsSchema, 'rgs');


// const voltagesSchema = new Schema({
//   Battery1:{
//     type: Number,
//     required: true
//   },
//   Battery2:{
//     type: Number,
//     required: true
//   },
//   Battery3:{
//     type: Number,
//     required: true
//   },
//   Battery4:{
//     type: Number,
//     required: true
//   },
//   Battery5:{
//     type: Number,
//     required: true
//   },
//   Battery6:{
//     type: Number,
//     required: true
//   },
//   Battery7:{
//     type: Number,
//     required: true
//   },
//   Battery8:{
//     type: Number,
//     required: true
//   }
// }, { _id: false });

// // Define the schema for the collection
// const rgsSchema = new Schema({
//     location:{
//       type: String,
//       required: true
//     },
//     voltages: [voltagesSchema]
//   }, {timestamps: true}
// )

// // Export the schema
// module.exports = mongoose.model('rgs_details', rgsSchema, 'rgs')