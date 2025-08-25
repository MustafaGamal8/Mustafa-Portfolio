'use client';

import { useState, useEffect } from 'react';
import { portfolioService } from '@/services/frontend/portfolio.service';
import { Language } from '@prisma/client';

interface PortfolioPreviewProps {
  className?: string;
}

export default function PortfolioPreview({ className = '' }: PortfolioPreviewProps) {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<Language>('AR');
  const [selectedSections, setSelectedSections] = useState<string[]>(['hero']);

  const availableSections = [
    'hero',
    'about',
    'skills',
    'projects',
    'achievements',
    'contact',
    'social'
  ];

  const fetchPortfolioData = async () => {
    if (selectedSections.length === 0) {
      setError('Please select at least one section');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await portfolioService.getPortfolioSections({
        lang: selectedLang,
        sections: selectedSections
      });

      setPortfolioData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Portfolio fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionToggle = (section: string) => {
    setSelectedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  useEffect(() => {
    if (selectedSections.length > 0) {
      fetchPortfolioData();
    }
  }, [selectedLang]);

  return (
    <div className={`portfolio-preview p-6 border rounded-lg bg-gray-50 ${className}`}>
      <div className="header mb-6">
        <h2 className="text-2xl font-bold mb-4">Portfolio API Preview</h2>

        {/* Language Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Language:</label>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value as Language)}
            className="border rounded px-3 py-2 mr-4"
          >
            <option value="AR">Arabic (AR)</option>
            <option value="EN">English (EN)</option>
          </select>
        </div>

        {/* Section Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Sections:</label>
          <div className="flex flex-wrap gap-2">
            {availableSections.map(section => (
              <label key={section} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSections.includes(section)}
                  onChange={() => handleSectionToggle(section)}
                  className="mr-2"
                />
                <span className="text-sm capitalize">{section}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fetch Button */}
        <button
          onClick={fetchPortfolioData}
          disabled={loading || selectedSections.length === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      </div>

      {/* Request Preview */}
      <div className="request-preview mb-6">
        <h3 className="text-lg font-semibold mb-2">Request Body:</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto" dir='ltr'>
          {JSON.stringify({ lang: selectedLang, sections: selectedSections }, null, 2)}
        </pre>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Data Display */}
      {portfolioData && (
        <div className="data-display" dir='ltr'>
          <h3 className="text-lg font-semibold mb-2">Response Data:</h3>
          <div className="bg-gray-800 text-green-400 p-4 rounded max-h-96 overflow-y-auto">
            <pre className="text-sm">
              {JSON.stringify(portfolioData, null, 2)}
            </pre>
          </div>

          {/* Quick Stats */}
          {portfolioData.data && (
            <div className="stats mt-4 p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">Quick Stats:</h4>
              <ul className="text-sm">
                <li>Language: <strong>{portfolioData.language}</strong></li>
                <li>Sections Requested: <strong>{portfolioData.requestedSections?.length || 0}</strong></li>
                <li>Sections Returned: <strong>{Object.keys(portfolioData.data || {}).length}</strong></li>
                <li>Success: <strong>{portfolioData.success ? 'Yes' : 'No'}</strong></li>
                {portfolioData.timestamp && (
                  <li>Timestamp: <strong>{new Date(portfolioData.timestamp).toLocaleString()}</strong></li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
