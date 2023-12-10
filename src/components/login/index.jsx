// ParentComponent.js
import React, { useState } from 'react';
import Login from './login';

function ParentComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <Login />
    </div>
  );
}

export default ParentComponent;
