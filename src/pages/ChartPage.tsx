import React, { useState, useEffect } from 'react';
import { ChartDashboardView } from '../views/chart';

const ChartPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ChartDashboardView isLoading={isLoading} />
  );
};

export default ChartPage;
