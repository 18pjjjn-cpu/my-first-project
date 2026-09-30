import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Timetable from './pages/Timetable';
import OTJLog from './pages/OTJLog';
import Resources from './pages/Resources';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} onUserSet={setUser} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                📚 Med Study
              </Link>

              <div className="flex gap-6 items-center">
                <Link to="/" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <Link to="/notes" className="text-gray-700 hover:text-blue-600">Notes</Link>
                <Link to="/flashcards" className="text-gray-700 hover:text-blue-600">Flashcards</Link>
                <Link to="/quiz" className="text-gray-700 hover:text-blue-600">Quiz</Link>
                <Link to="/timetable" className="text-gray-700 hover:text-blue-600">Timetable</Link>
                <Link to="/otj" className="text-gray-700 hover:text-blue-600">OTJ Log</Link>
                <Link to="/resources" className="text-gray-700 hover:text-blue-600">Resources</Link>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{user?.fullName}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/otj" element={<OTJLog />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
