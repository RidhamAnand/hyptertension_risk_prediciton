// App.jsx
import { useState } from 'react';

export default function App() {
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
    glucose: 77
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['male', 'currentSmoker', 'BPMeds', 'diabetes'].includes(name)
        ? parseInt(value) 
        : parseFloat(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Simple metrics visualization component
  const MetricsChart = ({ metrics }) => {
    if (!metrics) return null;
    
    // Prepare all metrics for display
    const allMetrics = [
      { name: 'Accuracy', value: metrics.accuracy },
      { name: 'AUC', value: metrics.auc },
      { name: 'Precision (No HTN)', value: metrics.precision["0"] },
      { name: 'Precision (HTN)', value: metrics.precision["1"] },
      { name: 'Recall (No HTN)', value: metrics.recall["0"] },
      { name: 'Recall (HTN)', value: metrics.recall["1"] },
      { name: 'F1 (No HTN)', value: metrics.f1_score["0"] },
      { name: 'F1 (HTN)', value: metrics.f1_score["1"] },
      { name: 'Macro F1', value: metrics.macro_avg.f1_score },
      { name: 'Macro Precision', value: metrics.macro_avg.precision },
      { name: 'Macro Recall', value: metrics.macro_avg.recall },
      { name: 'Weighted F1', value: metrics.weighted_avg.f1_score },
      { name: 'Weighted Precision', value: metrics.weighted_avg.precision },
      { name: 'Weighted Recall', value: metrics.weighted_avg.recall }
    ];
    
    return (
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Model: {metrics.name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          {allMetrics.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between text-xs">
                <span>{item.name}</span>
                <span>{(item.value * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${item.value * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Hypertension Risk Prediction</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Patient Data</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Gender</label>
              <select 
                name="male" 
                value={formData.male} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              >
                <option value={1}>Male</option>
                <option value={0}>Female</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Age</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Smoker</label>
              <select 
                name="currentSmoker" 
                value={formData.currentSmoker} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Cigs/Day</label>
              <input 
                type="number" 
                name="cigsPerDay" 
                value={formData.cigsPerDay} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">BP Meds</label>
              <select 
                name="BPMeds" 
                value={formData.BPMeds} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Diabetes</label>
              <select 
                name="diabetes" 
                value={formData.diabetes} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Total Chol.</label>
              <input 
                type="number" 
                name="totChol" 
                value={formData.totChol} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Sys. BP</label>
              <input 
                type="number" 
                name="sysBP" 
                value={formData.sysBP} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Dia. BP</label>
              <input 
                type="number" 
                name="diaBP" 
                value={formData.diaBP} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">BMI</label>
              <input 
                type="number" 
                name="BMI" 
                value={formData.BMI} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Heart Rate</label>
              <input 
                type="number" 
                name="heartRate" 
                value={formData.heartRate} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Glucose</label>
              <input 
                type="number" 
                name="glucose" 
                value={formData.glucose} 
                onChange={handleChange}
                className="w-full border rounded p-1 text-sm"
              />
            </div>
            
            <div className="col-span-2 mt-2">
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Predict'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Results Section */}
        <div className="border p-4 rounded">
          {prediction ? (
            <>
              {/* Simple Prediction Result */}
              <div className="text-center p-4 mb-4 border rounded">
                <h2 className="text-xl font-bold mb-2">Result</h2>
                <div className={`text-2xl font-bold ${prediction.prediction.predicted_class === 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {prediction.prediction.predicted_class === 0 ? 'NO HYPERTENSION' : 'HYPERTENSION DETECTED'}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Confidence: {(prediction.prediction.probabilities[prediction.prediction.predicted_class] * 100).toFixed(1)}%
                </div>
              </div>
              
              {/* Complete Metrics Visualization */}
              <div className="border rounded p-3">
                <MetricsChart metrics={prediction.metrics} />
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 text-center">
                Submit form to see prediction result and model metrics
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>College Course Project - Hypertension Risk Prediction</p>
      </div>
    </div>
  );
}