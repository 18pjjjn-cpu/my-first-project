import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Timetable = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('week');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'lecture',
    date: '',
    startTime: '',
    endTime: '',
    location: ''
  });

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/timetable/week/2026-10-01');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/timetable/event', formData);
      if (response.data.success) {
        setEvents([...events, response.data.event]);
        setFormData({ title: '', type: 'lecture', date: '', startTime: '', endTime: '', location: '' });
        setShowForm(false);
      }
    } catch (error) {
      alert('Error adding event: ' + error.message);
    }
  };

  const eventsByDay = events.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📅 Timetable</h1>
          <p className="text-gray-600 mt-2">Track your lectures, labs, and study sessions</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          + Add Event
        </button>
      </div>

      {/* Add Event Form */}
      {showForm && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Event</h2>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <input
              type="text"
              placeholder="Event title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="lecture">📚 Lecture</option>
              <option value="lab">🔬 Lab</option>
              <option value="tutorial">👥 Tutorial</option>
              <option value="study">📖 Study Session</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Add Event
            </button>
          </form>
        </div>
      )}

      {/* Events by Day */}
      <div className="space-y-6">
        {Object.entries(eventsByDay).map(([date, dayEvents]) => (
          <div key={date} className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              📅 {new Date(date).toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </h3>
            <div className="space-y-3">
              {dayEvents.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((event) => (
                <div
                  key={event.id}
                  className={`border-l-4 pl-4 py-3 ${
                    event.type === 'lecture'
                      ? 'border-blue-600'
                      : event.type === 'lab'
                      ? 'border-green-600'
                      : 'border-purple-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">
                        {event.startTime} - {event.endTime} · {event.location}
                      </p>
                    </div>
                    {event.gradMedicine && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-semibold">
                        🎓 Grad Med
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
