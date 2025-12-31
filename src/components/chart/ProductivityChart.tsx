import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';

// Dữ liệu mẫu theo thiết kế gốc
const defaultData = [
  { name: 'JAN', value: 800 },
  { name: 'FEB', value: 2000 },
  { name: 'MAR', value: 2800 },
  { name: 'APR', value: 800 },
  { name: 'MAY', value: 1900 },
  { name: 'JUN', value: 2800 },
  { name: 'JUL', value: 1500 },
  { name: 'AUG', value: 900 },
  { name: 'SEP', value: 2000 },
  { name: 'OCT', value: 800 },
  { name: 'NOV', value: 2000 },
  { name: 'DEC', value: 2800 },
];

interface ProductivityChartProps {
  data?: Array<{ name: string; value: number }>;
  maxValue?: number;
}

const ProductivityChart: React.FC<ProductivityChartProps> = ({ 
  data = defaultData, 
  maxValue = 6000 
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Custom Tooltip với thiết kế hiện đại
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0]?.value || 0;
      
      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-100 text-sm">
          <p className="font-semibold text-gray-800 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
            <span className="text-gray-600">
              Năng suất: <span className="font-medium text-gray-900">{value.toLocaleString()}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span className="text-gray-500 text-xs">
              Mục tiêu tối đa: {maxValue.toLocaleString()}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-lg productivity-chart-container">
      {/* Header với typography cải tiến */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 ml-8 tracking-tight">
          Năng xuất
        </h2>
        <p className="text-sm text-gray-500 ml-8 mt-1">
          Theo dõi hiệu suất hàng tháng
        </p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          barCategoryGap="40%" // Tăng khoảng cách giữa các cột
          onMouseMove={(state) => {
            if (state && typeof state.activeTooltipIndex === 'number') {
              setHoveredIndex(state.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Grid lines siêu mỏng với nét đứt */}
          <CartesianGrid 
            vertical={false} 
            strokeDasharray="2 4" 
            stroke="#E5E7EB" 
            strokeWidth={0.8}
          />

          {/* Trục X với typography cải tiến */}
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ 
              fill: '#9CA3AF', 
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
            dy={15}
          />

          {/* Trục Y với format tối ưu */}
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ 
              fill: '#9CA3AF', 
              fontSize: 11,
              fontWeight: 500
            }}
            tickFormatter={(value) => {
              if (value === 0) return '0';
              return `${value / 1000}k`;
            }}
            domain={[0, maxValue]}
            ticks={[0, 1000, 2000, 3000, 4000, 5000, 6000]}
            width={40}
          />

          {/* Tooltip với thiết kế hiện đại */}
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
          />

          {/* Background bars - Full height với pill shape */}
          <Bar 
            dataKey={() => maxValue}
            fill="#F3F4F6" 
            radius={[12, 12, 12, 12]} // Pill shape hoàn toàn
            barSize={14}
          />

          {/* Data bars với animation và hover effects */}
          <Bar 
            dataKey="value" 
            fill="#6366F1"
            radius={[12, 12, 12, 12]} // Pill shape hoàn toàn
            barSize={14}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={hoveredIndex === index ? '#5B21B6' : '#6366F1'}
                style={{
                  filter: hoveredIndex === index ? 'drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3))' : 'none',
                  transition: 'all 0.2s ease-in-out',
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Accessibility: Screen reader support */}
      <div className="sr-only">
        <h3>Biểu đồ năng suất theo tháng</h3>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.name}: {item.value.toLocaleString()} trên tổng {maxValue.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductivityChart;