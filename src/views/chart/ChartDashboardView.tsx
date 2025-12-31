import React from 'react';

interface ChartDashboardViewProps {
  isLoading?: boolean;
}

const ChartDashboardView: React.FC<ChartDashboardViewProps> = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-200 rounded-full animate-spin border-t-[#F79E61]"></div>
          <span className="text-gray-500 animate-pulse">Dang tai...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-gray-500 py-20">
          Trang bao cao dang duoc phat trien
        </div>
      </div>
    </div>
  );
};

export default ChartDashboardView;
