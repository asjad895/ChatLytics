
const mongoose=require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true, // Set this to true to make the 'name' field unique
    },
    usecase: String,
});
  


module.exports = mongoose.model('Group', groupSchema);

