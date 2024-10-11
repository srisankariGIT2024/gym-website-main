const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Import Nodemailer

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/powerfitgym', { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize the Express app
const app = express();
app.use(cors());
app.use(express.json());

// Define the Contact model
const Contact = mongoose.model('Contact', new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  enquiryStatus: { type: Number, required: true },
  reSubmit_count: { type: Number, default: 0 },
  resSubmit_on: { type: Date, default: Date.now },
  deleted: { type: Number, required: true },
  deletedlog: { type: String },
  deletedOn: { type: Date, default: Date.now },
}));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Use Gmail SMTP server
  port: 465, // Commonly used port
  secure: true, // Set to true for 465, false for other ports
  auth: {
    user: 'sreelogi24@gmail.com', // Your Gmail address
    pass: 'x i s n f u m o o h k w m j k z', // Your app password (not your Gmail password)
  },
});

// Handle contact form submissions
app.post('/contact', async (req, res) => {
  const { firstname, lastname, email, mobilenumber, message, resendLink } = req.body; // Add resendLink to body
  const enquiryStatus = 0; // Enquiry Status only, not a mentee
  const deleted = 0; // Active at Enquiry Table
  const deletedlog = ''; // Default value for deletedlog

  try {
    // Check if a contact with the given email or mobile number exists
    const existingContact = await Contact.findOne({
      $or: [{ email }, { mobilenumber }]
    });

    if (existingContact) {
      // Handle scenarios based on the existing contact's enquiryStatus
      switch (existingContact.enquiryStatus) {
        case 0:
          // Status 0: Increment reSubmit_count and update resSubmit_on
          existingContact.reSubmit_count = (existingContact.reSubmit_count || 0) + 1;
          existingContact.resSubmit_on = new Date(); // Update to current time
          await existingContact.save();
          return res.status(200).json({ message: 'Enquiry submitted. The mentor will contact you shortly.' });

        case 1:
          // Status 1: Inform the user that the registration link was already sent
          if (resendLink) {
            // Send the registration email again
            const mailOptions = {
              from: '"Fitness Center" <sreelogi24@example.com>',
              to: email,
              subject: 'Registration Link',
              text: `You have requested a new registration link. Please use the following link to register: [Registration Link]`,
            };
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'The registration link has been resent to your email.' });
          }
          return res.status(200).json({ message: 'The registration link has already been sent to you. Would you like to resend it?' });

        case 2:
          // Status 2: Provide the link to the dashboard for registered mentees
          return res.status(200).json({ message: 'You are a registered Mentee. Please use this link: http://localhost:5173/mentees to access your dashboard.' });

        default:
          return res.status(400).json({ message: 'Unexpected status. Please contact support.' });
      }
    } else {
      // If the contact does not exist, create a new one
      const newContact = new Contact({
        firstname,
        lastname,
        email,
        mobilenumber,
        message,
        enquiryStatus,
        deleted,
        deletedlog,
      });
      await newContact.save();

      // Send the registration email
      const mailOptions = {
        from: '"Fitness Center" <sreelogi24@example.com>',
        to: email,
        subject: 'Enquiry Details Submitted Successfully',
        text: `Your enquiry details are submitted successfully!\n\nName: ${firstname} ${lastname}\nEmail: ${email}\nMobile Number: ${mobilenumber}\nMessage: ${message}`,
      };

      await transporter.sendMail(mailOptions);
      return res.status(201).json({ message: 'Contact saved and email sent successfully!' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(400).json({ error: error.message });
  }
});


app.get('/contacts', async (req, res) => {
  console.log('Received request for contacts');
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
