const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    diseasename: { type: String, required: true, unique: true },
    diseasedescription: { type: String },
    status: { type: Number, required: true },
    deleted: { type: Number, required: true },
    deletedOn: { type: Date, default: Date.now },
  }, { timestamps: true });
  
const Disease = mongoose.model('disease', diseaseSchema, 'diseases_list'); // Specify the collection name
  
module.exports = Disease;
