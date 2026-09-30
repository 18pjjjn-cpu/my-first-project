import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OTJLog = () => {
  const [logs, setLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    activityType: 'Research',
    description: '',
    hoursSpent: '',
    competenciesCovered: []
  });

  useEffect(() => {
    fetchOTJLogs();
  }, []);

  const fetchOTJLogs = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || '/api';
      const response = await axios.get(`${API_URL}/otj`);
      setLogs(response.data.logs || []);
    } catch (error) {
      console.error('Error fetching OTJ logs:', error);
    }
  };

  const handleAddLog = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL || '/api';
      const response = await axios.post(`${API_URL}/otj/log`, formData);
      if (response.data.success) {
        setLogs([...logs, response.data.entry]);
        setFormData({
          date: new Date().toISOString().split('T')[0],
          activityType: 'Research',
          description: '',
          hoursSpent: '',
          competenciesCovered: []
        });
        setShowForm(false);
      }
    } catch (error) {
      alert('Error logging OTJ: ' + error.message);
    }
  };

  const totalHours = logs.reduce((sum, log) => sum + (log.hoursSpent || 0), 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 Off-The-Job Training Log</h1>
          <p className="text-gray-600 mt-2">Track your apprenticeship standard compliance</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          + Log Activity
        </button>
      </div>

      {/* Progress Card */}
      <div className="card">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-gray-600 text-sm">Total Hours Logged</p>
            <p className="text-3xl font-bold text-blue-600">{totalHours}h</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Required Hours</p>
            <p className="text-3xl font-bold text-gray-900">300h</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Progress</p>
            <p className="text-3xl font-bold text-green-600">{((totalHours / 300) * 100).toFixed(0)}%</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-6">
          <div
            className="bg-gradient-to-r from-blue-600 to-green-600 h-4 rounded-full transition-all"
            style={{ width: `${Math.min((totalHours / 300) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Add Log Form */}
      {showForm && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Log Off-The-Job Activity</h2>
          <form onSubmit={handleAddLog} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                <select
                  value={formData.activityType}
                  onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option>Research</option>
                  <option>Reading</option>
                  <option>Online Course</option>
                  <option>Workshop</option>
                  <option>Professional Development</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What did you learn or study?"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours Spent</label>
              <input
                type="number"
                step="0.5"
                value={formData.hoursSpent}
                onChange={(e) => setFormData({ ...formData, hoursSpent: parseFloat(e.target.value) })}
                placeholder="e.g., 2.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn-primary flex-1">
                Save Log
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* OTJ Logs List */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Activity Log</h2>
        {logs.length > 0 ? (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="card">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{log.activityType}</h3>
                    <p className="text-sm text-gray-600">{log.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">{log.hoursSpent}h</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      log.status === 'submitted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{log.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-8">
            <p className="text-gray-600">No activities logged yet. Start tracking your learning!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTJLog;
