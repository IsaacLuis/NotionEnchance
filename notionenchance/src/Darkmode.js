import React, { useEffect, useState } from 'react';

const Darkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const className = 'dark-mode';
    const element = document.body; 
    if (isDarkMode) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="dark-mode-toggle">
      <input type="checkbox" id="dark-mode-toggle" checked={isDarkMode} onChange={handleToggle} />
      <label htmlFor="dark-mode-toggle"></label>
    </div>
  );
};

export default Darkmode;

