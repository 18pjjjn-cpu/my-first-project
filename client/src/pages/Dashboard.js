import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    notesUploaded: 0,
    flashcardsCreated: 0,
    quizzesCompleted: 0,
    otjHoursLogged: 0,
    otjHoursRequired: 300
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notesRes, flashcardsRes, quizRes, otjRes, timetableRes] = await Promise.all([
          axios.get('http://localhost:5000/api/notes'),
          axios.get('http://localhost:5000/api/flashcards/1'),
          axios.get('http://localhost:5000/api/quiz/history'),
          axios.get('http://localhost:5000/api/otj/summary'),
          axios.get('http://localhost:5000/api/timetable/week/2026-10-01')
        ]);

        setStats({
          notesUploaded: notesRes.data.notes?.length || 0,
          flashcardsCreated: flashcardsRes.data.flashcards?.length || 0,
          quizzesCompleted: quizRes.data.quizzes?.length || 0,
          otjHoursLogged: otjRes.data.totalHours || 0,
          otjHoursRequired: 300
        });

        setUpcomingEvents(timetableRes.data.events?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const otjProgress = (stats.otjHoursLogged / stats.otjHoursRequired) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user?.fullName}!</h1>
        <p className="text-gray-600">Here's your study progress overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/notes" className="card hover:shadow-lg transition">
          <div className="text-3xl mb-2">📝</div>
          <h3 className="text-sm text-gray-600">Notes Uploaded</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.notesUploaded}</p>
        </Link>

        <Link to="/flashcards" className="card hover:shadow-lg transition">
          <div className="text-3xl mb-2">🎴</div>
          <h3 className="text-sm text-gray-600">Flashcards</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.flashcardsCreated}</p>
        </Link>

        <Link to="/quiz" className="card hover:shadow-lg transition">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="text-sm text-gray-600">Quizzes Completed</h3>
          <p className="text-3xl font-bold text-green-600">{stats.quizzesCompleted}</p>
        </Link>

        <Link to="/otj" className="card hover:shadow-lg transition">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-sm text-gray-600">OTJ Hours</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.otjHoursLogged}h</p>
        </Link>
      </div>

      {/* OTJ Progress */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Off-the-Job Training Progress</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${Math.min(otjProgress, 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="text-right whitespace-nowrap">
            <p className="text-2xl font-bold text-blue-600">{stats.otjHoursLogged}</p>
            <p className="text-sm text-gray-600">/ {stats.otjHoursRequired} hours</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Upcoming Classes & Labs</h2>
        {upcomingEvents.length > 0 ? (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border-l-4 border-blue-600 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.date} · {event.startTime} - {event.endTime}
                    </p>
                    <p className="text-sm text-gray-600">📍 {event.location}</p>
                  </div>
                  {event.gradMedicine && (
                    <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-semibold">
                      🎓 Grad Med
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No upcoming events</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/notes"
          className="card hover:shadow-lg transition text-center py-8"
        >
          <div className="text-5xl mb-3">📚</div>
          <h3 className="text-lg font-semibold text-gray-900">Upload Notes</h3>
          <p className="text-sm text-gray-600 mt-2">Add PowerPoint slides for auto-generated flashcards</p>
        </Link>

        <Link
          to="/resources"
          className="card hover:shadow-lg transition text-center py-8"
        >
          <div className="text-5xl mb-3">🔗</div>
          <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
          <p className="text-sm text-gray-600 mt-2">Anatomy tools, grad med prep & IBMS links</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
