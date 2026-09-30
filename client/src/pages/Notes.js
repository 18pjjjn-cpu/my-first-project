import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data.notes || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      alert('Please enter title and select a file');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('userId', localStorage.getItem('userId'));

    try {
      const response = await axios.post('http://localhost:5000/api/notes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setNotes([...notes, response.data.file]);
        setFile(null);
        setTitle('');
        alert('Notes uploaded successfully!');
      }
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📝 Lecture Notes</h1>
        <p className="text-gray-600 mt-2">Upload PowerPoint slides and generate flashcards automatically</p>
      </div>

      {/* Upload Form */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upload New Notes</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Cardiovascular System - Lecture 5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PowerPoint File
            </label>
            <input
              type="file"
              accept=".ppt,.pptx"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Upload .ppt or .pptx files</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isLoading ? '⏳ Uploading...' : '📤 Upload & Generate Flashcards'}
          </button>
        </form>
      </div>

      {/* Notes List */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Notes</h2>
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note) => (
              <div key={note.id} className="card hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{note.filename}</h3>
                  <button className="text-red-600 hover:text-red-700">🗑️</button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Uploaded {new Date(note.uploadedAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 btn-primary text-sm">
                    📖 View
                  </button>
                  <button className="flex-1 btn-secondary text-sm">
                    🎴 Flashcards
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-600">No notes uploaded yet. Start by uploading your first PowerPoint!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
