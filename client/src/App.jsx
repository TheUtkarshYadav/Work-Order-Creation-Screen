import React, { useState } from 'react';
import WorkOrderForm from './components/WorkOrderForm.jsx';
import Overview from './components/Overview.jsx';
import Other from './components/Other.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="container mx-auto p-4">
      <div className="tabs">
        <button className={`tab ${activeTab === 'Overview' ? 'tab-active' : ''}`} onClick={() => setActiveTab('Overview')}>Overview</button>
        <button className={`tab ${activeTab === 'Other' ? 'tab-active' : ''}`} onClick={() => setActiveTab('Other')}>Other</button>
      </div>
      {activeTab === 'Overview' && <Overview />}
      {activeTab === 'Other' && <Other />}
    </div>
  );
}

export default App;