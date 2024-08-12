// Component that shows date and time

import React, { useState, useEffect } from 'react';

const DateTimeComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>{currentTime.toLocaleTimeString()}</h1>
      <h2>{currentTime.toLocaleDateString()}</h2>
    </div>
  );
};

export default DateTimeComponent;
