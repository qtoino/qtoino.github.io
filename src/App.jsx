import React, { useState } from 'react';
import ThreeScene from './ThreeScene';

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-screen bg-black text-white">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-2xl">Loading...</div>
        </div>
      )}

      {/* 3D Scene */}
      <ThreeScene />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-4 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Portfolio</div>
          <div className="space-x-6">
            {['home', 'projects', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`capitalize ${
                  currentSection === section
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Section Content */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Add section content components here */}
      </div>
    </div>
  );
};

export default App;