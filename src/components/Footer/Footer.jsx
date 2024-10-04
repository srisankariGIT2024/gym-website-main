import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import axios from 'axios';

const Footer = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobilenumber: '',
    message: ''
  });
  const [alert, setAlert] = useState({ message: '', type: '' }); // Add alert state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/contact', formData);
      console.log(response.data);
      setAlert({ message: 'Your enquiry details are submitted successfully! Please check your email for further communication!', type: 'success' }); // Set success alert
      setFormData({ name: '', email: '', message: '' }); // Clear form after submission
      setTimeout(() => setAlert({ message: '', type: '' }), 3000); // Clear alert after 3 seconds
    } catch (error) {
      console.error("There was an error submitting the form!", error.response ? error.response.data : error.message);
      setAlert({ message: 'Error submitting the form. Please try again.', type: 'error' }); // Set error alert
    }
  };

  return (
    <div className="py-10 w-100 bg-gray-100 dark:bg-dark dark:text-white duration-300">
      <div className="container">
        {alert.message && (
          <div className={`alert ${alert.type === 'success' ? 'bg-green-800' : 'bg-red-200'} p-4 mb-4 rounded`}>
            {alert.message}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center">
          <div className="flex items-center justify-center gap-3">
            <img src={Logo} alt="Logo" className="w-16" />
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram"><FaInstagram className="text-3xl hover:text-primary duration-300" /></a>
              <a href="#" aria-label="Facebook"><FaFacebook className="text-3xl hover:text-primary duration-300" /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin className="text-3xl hover:text-primary duration-300" /></a>
            </div>
          </div>
          <div className="sm:block hidden">Contact us: +91 123456789</div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-dark">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="border rounded p-2"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="border rounded p-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded p-2"
            />
            <input
              type="text"
              name="mobilenumber" // Updated here
              placeholder="Mobile Number"
              value={formData.mobilenumber}
              onChange={handleChange}
              required
              className="border rounded p-2"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border rounded p-2"
            />
            <button
              type="submit"
              className="bg-primary text-white py-2 rounded hover:bg-primary-dark transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
