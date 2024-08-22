// App.js
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppContent from './components/AppContent';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;