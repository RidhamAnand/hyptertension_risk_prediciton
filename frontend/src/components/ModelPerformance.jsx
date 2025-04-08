// src/components/ModelPerformance.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ModelPerformance = ({ predictions, models }) => {
  const [selectedTab, setSelectedTab] = useState('chart');

  if (!predictions || !predictions.results) {
    return <div>No prediction data available</div>;
  }

  const { results, best_model, input_data } = predictions;

  // Prepare data for the chart
  const chartData = Object.keys(results).map(modelName => {
    const modelData = results[modelName];
    return {
      name: modelName,
      prediction: modelData.prediction,
      confidence: modelData.confidence,
      isBest: modelName === best_model
    };
  });

  return (
    <div>
      <div className="mb-4">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setSelectedTab('chart')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'chart'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Chart View
            </button>
            <button
              onClick={() => setSelectedTab('table')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'table'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setSelectedTab('raw')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'raw'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Raw Data
            </button>
          </nav>
        </div>
      </div>

      {best_model && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded">
          <h3 className="font-bold text-green-800">Best Model: {best_model}</h3>
          <p className="text-green-700">
            Prediction: {results[best_model].prediction.toFixed(4)}
            {results[best_model].confidence && 
              ` (Confidence: ${(results[best_model].confidence * 100).toFixed(2)}%)`}
          </p>
        </div>
      )}

      {selectedTab === 'chart' && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="prediction" 
                fill="#3b82f6"
                name="Prediction"
                isAnimationActive={false}
              />
              {chartData[0].confidence !== null && (
                <Bar 
                  dataKey="confidence" 
                  fill="#10b981"
                  name="Confidence"
                  isAnimationActive={false}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {selectedTab === 'table' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prediction
                </th>
                {Object.values(results)[0].confidence !== null && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.keys(results).map((modelName) => {
                const modelData = results[modelName];
                return (
                  <tr key={modelName} className={modelName === best_model ? 'bg-green-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {modelName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {modelData.prediction !== undefined 
                        ? modelData.prediction.toFixed(4) 
                        : 'Error'}
                    </td>
                    {Object.values(results)[0].confidence !== null && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {modelData.confidence !== undefined 
                          ? `${(modelData.confidence * 100).toFixed(2)}%` 
                          : 'N/A'}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {modelName === best_model ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Best
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Standard
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedTab === 'raw' && (
        <div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Input Data:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(input_data, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Results:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelPerformance;