const mongoose = require('mongoose');

const registermenteeSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  age: { type: Number, required: true },  
  natureofwork: { type: String, required: true },
  height: { type: Number, required: true },  
  weight: { type: Number, required: true },  
  sportsPerson: { type: String },
  familyhistory_diseses: { type: String },
  allergies: { type: String, required: true },
  tablets: { type: String, required:true },
  medicalhistory: { type: String, required:true },
  goals: { type: String, required:true },
  currentstresslevel:{ type: Number, required:true },
  createdAt: { type: Date, default: Date.now }, 
  enquiryStatus: {type: Number, required: true},
  reSubmit_count: {type: Number},
  reSubmit_on:  { type: Date, default: Date.now }, 
  deleted: {type: Number, required: true},
  deletedlog: { type: String},
  deletedOn: { type: Date, default: Date.now }, 
}, { timestamps: true });

const RegisterMentee = mongoose.model('RegisterMentee', registermenteeSchema);

module.exports = RegisterMentee;
