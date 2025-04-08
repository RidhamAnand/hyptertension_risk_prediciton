// src/components/InputForm.jsx
import { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    male: 1,
    age: 39,
    currentSmoker: 0,
    cigsPerDay: 0,
    BPMeds: 0,
    diabetes: 0,
    totChol: 195,
    sysBP: 106,
    diaBP: 70,
    BMI: 26.97,
    heartRate: 80,
    glucose: 77,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    
    // Convert booleans and numbers
    if (name === 'male' || name === 'currentSmoker' || name === 'BPMeds' || name === 'diabetes') {
      parsedValue = parseInt(value);
    } else if (
      name === 'age' || 
      name === 'cigsPerDay' || 
      name === 'totChol' || 
      name === 'sysBP' || 
      name === 'diaBP' || 
      name === 'heartRate' || 
      name === 'glucose'
    ) {
      parsedValue = parseInt(value);
    } else if (name === 'BMI') {
      parsedValue = parseFloat(value);
    }
    
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="male"
            value={formData.male}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Smoker</label>
          <select
            name="currentSmoker"
            value={formData.currentSmoker}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Cigarettes Per Day</label>
          <input
            type="number"
            name="cigsPerDay"
            value={formData.cigsPerDay}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">BP Meds</label>
          <select
            name="BPMeds"
            value={formData.BPMeds}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Diabetes</label>
          <select
            name="diabetes"
            value={formData.diabetes}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Cholesterol</label>
          <input
            type="number"
            name="totChol"
            value={formData.totChol}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Systolic BP</label>
          <input
            type="number"
            name="sysBP"
            value={formData.sysBP}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Diastolic BP</label>
          <input
            type="number"
            name="diaBP"
            value={formData.diaBP}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">BMI</label>
          <input
            type="number"
            step="0.01"
            name="BMI"
            value={formData.BMI}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Heart Rate</label>
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Glucose</label>
          <input
            type="number"
            name="glucose"
            value={formData.glucose}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Get Predictions
        </button>
      </div>
    </form>
  );
};

export default InputForm;