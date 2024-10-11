const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  message: { type: String, required: true },  
  createdAt: { type: Date, default: Date.now }, 
  enquiryStatus: {type: Number, required: true},
  reSubmit_count: {type: Number},
  reSubmit_on:  { type: Date, default: Date.now }, 
  deleted: {type: Number, required: true},
  deletedlog: { type: String},
  deletedOn: { type: Date, default: Date.now }, 
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
