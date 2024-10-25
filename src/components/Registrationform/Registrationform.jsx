import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/logo.png"; // Make sure the path to your logo is correct
import axios from 'axios'; // Ensure axios is installed

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    age: '',
    gender: '',
    natureOfWork: '',
    height: '',
    weight: '',
    sportsPersonRecords: '',
    familyDiseases: [],
    allergies: '',
    tablets: '',
    medicalHistory: '',
    goals: '',
    stressLevel: ''
  });

  const [errors, setErrors] = useState({});

  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/diseases'); // Update with your API endpoint
        setDiseases(response.data);
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    };

    fetchDiseases();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple validation
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== 'sportsPersonRecords' && key !== 'allergies' && key !== 'tablets' && key !== 'medicalHistory' && key !== 'goals') {
        newErrors[key] = true;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevent form submission
    }

    try {
      const response = await axios.post('http://localhost:5000/registermentees', formData);
      alert(response.data);

      // Reset the form
      setFormData({
        firstName: '',
        secondName: '',
        age: '',
        gender: '',
        natureOfWork: '',
        height: '',
        weight: '',
        sportsPersonRecords: '',
        familyDiseases: [],
        allergies: '',
        tablets: '',
        medicalHistory: '',
        goals: '',
        stressLevel: '',
      });
      setErrors({}); // Clear errors
    } catch (error) {
      console.error('Error saving data:', error);
      alert('There was an error saving your data.');
    }
  };


  const showMedicalHistory = () => {
    alert(`Medical History:\n${formData.medicalHistory}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Your Company"
          src={Logo}
          className="mx-auto h-24 w-24"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Register Yourself !!
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          <Link
            to="/mentor"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 text-primary"
          > Already a Mentee?</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xxl text-dark">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form method="POST" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-5 text-gray-700">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out`}
              />
              {errors.firstName && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>

            <div>
              <label htmlFor="secondName" className="block text-sm font-medium leading-5 text-gray-700">Last Name</label>
              <input
                id="secondName"
                name="secondName"
                type="text"
                required
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${errors.secondName ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out`}
              />
              {errors.secondName && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium leading-5 text-gray-700">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                required
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out`}
              />
              {errors.age && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium leading-5 text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                required
                onChange={handleChange}
                className="block w-full px-3 py-2 bg-white text-dark border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="natureOfWork" className="block text-sm font-medium leading-5 text-gray-700">Nature of Work</label>
              <input
                id="natureOfWork"
                name="natureOfWork"
                type="text"
                required
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${errors.natureOfWork ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out`}
              />
              {errors.natureOfWork && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium leading-5 text-gray-700">Height (cm)</label>
              <input
                id="height"
                name="height"
                type="number"
                required
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${errors.height ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out`}
              />
              {errors.height && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium leading-5 text-gray-700">Weight (kg)</label>
              <input
                id="weight"
                name="weight"
                type="number"
                required
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${errors.weight ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out`}
              />
              {errors.weight && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>

            <div>
              <label htmlFor="sportsPersonRecords" className="block text-sm font-medium leading-5 text-gray-700">Sports Person - Records</label>
              <input
                id="sportsPersonRecords"
                name="sportsPersonRecords"
                type="text"
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium leading-5 text-gray-700">Allergies</label>
              <input
                id="allergies"
                name="allergies"
                type="text"
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="familyDiseases" className="block text-sm font-medium leading-5 text-gray-700">Family Background - Diseases</label>
              <select
                id="familyDiseases"
                name="familyDiseases"
                multiple
                required
                onChange={handleChange}
                className="block w-full px-3 py-2 bg-white text-primary border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
              >
                {diseases.map(disease => (
                  <option key={disease._id} value={disease.diseasename}>
                    {disease.diseasename}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tablets" className="block text-sm font-medium leading-5 text-gray-700">Tablets</label>
              <textarea
                id="tablets"
                name="tablets"
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
                rows="3"
              />
            </div>

            <div>
              <label htmlFor="medicalHistory" className="block text-sm font-medium leading-5 text-gray-700">Medical History</label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
                rows="3"
              />
            </div>

            <div>
              <label htmlFor="goals" className="block text-sm font-medium leading-5 text-gray-700">Goals</label>
              <input
                id="goals"
                name="goals"
                type="text"
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="stressLevel" className="block text-sm font-medium leading-5 text-gray-700">Current Stress Level</label>
              <select
                id="stressLevel"
                name="stressLevel"
                onChange={handleChange}
                className="block w-full px-3 py-2 bg-white text-dark border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
              >
                <option value="">Select Stress Level</option>
                {[1, 2, 3, 4, 5].map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-3 flex justify-end mt-4">
              <button
                type="submit"
                className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
