import React, { useState } from 'react';
import WorkOrderForm from './components/WorkOrderForm.jsx';
import Overview from './components/Overview.jsx';
import Other from './components/Other.jsx';
import Header from './components/Header.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex my-5">
        <button
          className={`w-[200px] px-10 py-2 ${activeTab === 'Overview' ? 'border-b-2 border-black' : 'border-b-2 border-gray-400'}`}
          onClick={() => setActiveTab('Overview')}
        >
          Overview
        </button>
        <button
          className={`w-[200px] px-10 py-2 ${activeTab === 'Other' ? 'border-b-2 border-black' : 'border-b-2 border-gray-400'}`}
          onClick={() => setActiveTab('Other')}
        >
          Other
        </button>
      </div>
      {activeTab === 'Overview' && <Overview />}
      {activeTab === 'Other' && <Other />}
    </div>
  );
}

export default App;
