import React, { useState } from 'react';
import '../css style/css.css';

function CVDownloadSection({ cvData }) {
  const [showModal, setShowModal] = useState(false);

  const generateCV = async (profileType) => {
    try {
      const res = await fetch('http://localhost:3002/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cvData, profileType }),
      });

      if (!res.ok) throw new Error('Failed to generate CV');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CV-${profileType}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert('Error generating CV');
    }
  };

  return (
    <div className="cv-section">
      <button className="download-btn" onClick={() => setShowModal(true)}>
        Download CV
      </button>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content cv-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            <h3>Select CV Type</h3>
            <div className="cv-options">
              <button onClick={() => generateCV('ats')}>ATS</button>
              <button onClick={() => generateCV('modern')}>Modern</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CVDownloadSection;