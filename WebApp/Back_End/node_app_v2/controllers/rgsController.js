const rgs = require('../utils/rgsSchema.js');

const rgsController = {
  addRGS: async (req, res) => {
    try{
        const newRGS = new rgs(req.body);
        const location = req.body.location;

        const RGS = await rgs.findOne({ location: location });
        if (RGS){
          res.send('RGS already exists');
        }else{
          const db = mongoose.connection.useDb('system_details');
          const savedRGS = await newRGS.save();
          console.log(savedRGS);
          res.send('New RGS added. ID:' + savedRGS._id);
        }
    }
    catch(err){
        console.log(err);
    }
  },
  updateVoltages: async (req, res) => {
    try {
        const newVoltages = req.body.battery_data;
        const query = { location: req.body.location };
    
        // Update the document with new voltages
        const updatedRGS = await rgs.findOneAndUpdate(query, { $set: { battery_data: newVoltages } }, {
          new: true
        });
    
        if (updatedRGS) {
          res.send('RGS data updated');
        } else {
          res.status(404).send('RGS data not found');
        }
      } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
  },
  getVoltages: async (req, res) => {
    try {
        // Access location from route parameter
        const location = req.params.location;
    
        // Construct query
        const query = { location: location };
    
        // Perform the database query to find RGS details based on the location
        const RGS_details = await rgs.findOne(query);
        
        // Check if RGS details were found
        if (RGS_details) {
          // Send 200 OK status and the found RGS_details
          res.status(200).send(RGS_details);
        } else {
          // Send 404 if RGS details not found
          res.status(404).send('RGS details not found');
        }
      } catch (err) {
        // Log any errors that occur
        console.error(err);
        // Send a 500 Internal Server Error response
        res.status(500).send('Internal Server Error');
      }
  }
};

module.exports = rgsController;
