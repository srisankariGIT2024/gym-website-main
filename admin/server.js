const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const router = express.Router();

// Connect to MongoDB (replace with your own connection string)
mongoose.connect('mongodb://localhost:27017/powerfitgym')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
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

// Define the RegisterMentee schema
const registerMenteeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  natureOfWork: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  sportsPersonRecords: { type: String },
  familyDiseases: { type: [String] },
  allergies: { type: String },
  tablets: { type: String },
  medicalHistory: { type: String },
  goals: { type: String },
  stressLevel: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const RegisterMentee = mongoose.model('RegisterMentee', registerMenteeSchema);

// Define the Disease model
const diseaseSchema = new mongoose.Schema({
  diseasename: { type: String, required: true, unique: true },
  diseasedescription: { type: String },
  status: { type: Number, required: true },
  deleted: { type: Number, required: true },
  deletedOn: { type: Date, default: Date.now },
}, { timestamps: true });

const Disease = mongoose.model('Disease', diseaseSchema, 'diseases_list');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'sreelogi24@gmail.com',
    pass: 'x i s n f u m o o h k w m j k z', // Use an app password, not your Gmail password
  },
});

// Handle contact form submissions
app.post('/contact', async (req, res) => {
  const { firstname, lastname, email, mobilenumber, message, resendLink } = req.body;
  const enquiryStatus = 0;
  const deleted = 0;
  const deletedlog = '';

  try {
    const existingContact = await Contact.findOne({
      $or: [{ email }, { mobilenumber }]
    });

    if (existingContact) {
      switch (existingContact.enquiryStatus) {
        case 0:
          existingContact.reSubmit_count++;
          existingContact.resSubmit_on = new Date();
          await existingContact.save();
          return res.status(200).json({ message: 'Enquiry submitted. The mentor will contact you shortly.' });

        case 1:
          if (resendLink) {
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
          return res.status(200).json({ message: 'You are a registered Mentee. Please use this link: http://localhost:5173/mentees to access your dashboard.' });

        default:
          return res.status(400).json({ message: 'Unexpected status. Please contact support.' });
      }
    } else {
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

// app.get('/contacts', async (req, res) => {
//   const { enquiryStatus, reSubmit_count, deleted } = req.query;

//   const filters = {};

//   if (enquiryStatus === undefined) {
//     filters.enquiryStatus = 0; 
//   } else {
//     filters.enquiryStatus = Number(enquiryStatus); 
//   }

//   if (deleted === undefined) {
//     filters.deleted = 0; 
//   } else {
//     filters.deleted = Number(deleted); 
//   }

//   if (filters.enquiryStatus === 0 && (reSubmit_count === undefined || Number(reSubmit_count) === 0)) {
//     // Resubmission
//     filters.reSubmit_count = 0;
//   } else if (filters.enquiryStatus === 0 && Number(reSubmit_count) >= 1) {
//     // One Time Registration Link Already
//     filters.reSubmit_count = { $gte: 1 };
//   } else if (filters.enquiryStatus === 1 && reSubmit_count !== undefined && Number(reSubmit_count) >= 1) {
//     // Resubmission
//     filters.reSubmit_count = { $gte: 1 };
//   } else if (filters.enquiryStatus === 2) {
//     // Active Mentee
//     filters.deleted = 0;
//   }

//   try {
//     const enquiries = await Contact.find(filters).exec();
//     res.json(enquiries);
//   } catch (error) {
//     console.error('Error fetching enquiries:', error);
//     res.status(500).json({ message: 'Failed to load enquiries.' });
//   }
// });
// app.get('/api/enquiries', async (req, res) => {
//   try {
//       const enquiries = await Contact.find({});
//       res.json(enquiries);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// });

// API Endpoints
app.get('/api/enquiries', async (req, res) => {
  try {
      const enquiries = await Contact.find();
      res.json(enquiries);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching enquiries' });
  }
});


// Send Registration Link Endpoint
app.post('/send-registration-link', (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: 'sreelogi24@gmail.com',
    to: email,
    subject: 'Registration Link',
    text: 'Click here to register: http://localhost:5173/register',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send({ message: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    res.send({ message: 'Email sent successfully' });
  });
});

// Route to fetch diseases
app.get('/diseases', async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.status(200).json(diseases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register mentee
app.post('/registermentees', async (req, res) => {
  try {
    const menteeData = new RegisterMentee(req.body);
    await menteeData.save();
    res.status(201).send('Mentee registration successful');
  } catch (error) {
    console.error('Error saving mentee data:', error);
    res.status(500).send('Error saving mentee data: ' + error.message);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
