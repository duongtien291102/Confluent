import React, { useState, useEffect } from 'react';
import { ChartDashboardView } from '../views/chart';
import { mockChartData } from '../data';

const ChartPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ChartDashboardView 
      data={mockChartData} 
      isLoading={isLoading}
    />
  );
};

export default ChartPage;
