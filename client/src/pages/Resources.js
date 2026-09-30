import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('anatomy');
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, [activeTab]);

  const fetchResources = async () => {
    try {
      let response;
      if (activeTab === 'anatomy') {
        response = await axios.get('http://localhost:5000/api/resources/anatomy');
      } else if (activeTab === 'grad-medicine') {
        response = await axios.get('http://localhost:5000/api/resources/grad-medicine');
      } else if (activeTab === 'ibms') {
        response = await axios.get('http://localhost:5000/api/resources/ibms');
      }
      setResources(response.data.resources || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🔗 Resources</h1>
        <p className="text-gray-600 mt-2">Anatomy tools, graduate medicine prep, and IBMS materials</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('anatomy')}
          className={`pb-4 px-4 font-semibold transition ${
            activeTab === 'anatomy'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🧬 Anatomy Resources
        </button>
        <button
          onClick={() => setActiveTab('grad-medicine')}
          className={`pb-4 px-4 font-semibold transition ${
            activeTab === 'grad-medicine'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🎓 Grad Medicine Prep
        </button>
        <button
          onClick={() => setActiveTab('ibms')}
          className={`pb-4 px-4 font-semibold transition ${
            activeTab === 'ibms'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📚 IBMS Reading
        </button>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="card hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 flex-1">{resource.title}</h3>
              {resource.importance === 'high' && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-semibold">
                  ⭐ Important
                </span>
              )}
              {resource.type === 'interactive' && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold ml-2">
                  🎮 Interactive
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-4">{resource.description}</p>

            {resource.topics && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-600 mb-2">Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {resource.topics.map((topic, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
              >
                {activeTab === 'anatomy' ? '🔬 Explore' : '📖 Read More'} →
              </a>
            )}

            {!resource.url && (
              <button className="btn-primary w-full text-sm">
                {activeTab === 'anatomy' ? '🔬 Explore' : '📖 Read More'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Featured Section */}
      {activeTab === 'grad-medicine' && (
        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
          <h2 className="text-2xl font-bold text-red-900 mb-4">🎓 Medical School Applications</h2>
          <p className="text-red-800 mb-4">
            These topics are frequently tested in medical school interviews and applications. Ensure you have a deep understanding of these areas to strengthen your candidacy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Immunology</h3>
              <p className="text-sm text-gray-600">Adaptive and innate immunity, antibody responses</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Genetics</h3>
              <p className="text-sm text-gray-600">Mendelian inheritance, molecular genetics</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Pathophysiology</h3>
              <p className="text-sm text-gray-600">Disease mechanisms and clinical manifestations</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ibms' && (
        <div className="card bg-blue-50 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">📚 IBMS Professional Development</h2>
          <p className="text-blue-800 mb-4">
            The Institute of Biomedical Science sets the standards for your profession. These resources align with the IBMS Apprenticeship Standard and professional qualifications.
          </p>
          <div className="text-sm text-blue-700">
            <p className="mb-2">✅ Official standards and competency frameworks</p>
            <p className="mb-2">✅ Latest research and professional updates</p>
            <p>✅ Qualifications and diploma syllabi</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
