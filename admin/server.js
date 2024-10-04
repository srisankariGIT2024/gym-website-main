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
  const { firstname, lastname, email, mobilenumber, message, createdAt } = req.body;
  try {
    // Save contact to MongoDB
    const newContact = new Contact({ firstname, lastname, email, mobilenumber, message, createdAt });
    await newContact.save();

    // Set up email data
    const mailOptions = {
      from: '"Fitness Center" <sreelogi24@example.com>', // Sender address
      to: email, // Recipient (user's email)
      subject: 'Enquiry Details Submitted Successfully', // Subject line
      text: `Your enquiry details are submitted successfully!\n\nName: ${firstname} ${lastname}\nEmail: ${email}\nMobile Number: ${mobilenumber}\nMessage: ${message}`, // Plain text body
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(201).json({ message: 'Contact saved and email sent successfully!' });
  } catch (error) {
    console.error('Error:', error); // Log error details for debugging
    res.status(400).json({ error: error.message });
  }
});

// Handle fetching all contacts
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
