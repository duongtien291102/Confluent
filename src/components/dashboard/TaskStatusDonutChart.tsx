import React, { useState, useCallback, useMemo } from 'react';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';
import type { TaskStatusItem } from '../../data/dashboard.data';

interface TaskStatusDonutChartProps {
    data: TaskStatusItem[];
    onStatusClick?: (status: string) => void;
}

const INNER_RADIUS = 55;
const OUTER_RADIUS = 80;

const TaskStatusDonutChart: React.FC<TaskStatusDonutChartProps> = ({ data, onStatusClick }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [legendHoverIndex, setLegendHoverIndex] = useState<number | null>(null);

    const total = useMemo(() => data.reduce((sum, item) => sum + item.count, 0), [data]);

    const getPercentage = useCallback((count: number): string => {
        if (total === 0) return '0';
        const pct = (count / total) * 100;
        if (pct < 1 && pct > 0) return '<1';
        if (pct < 10) return pct.toFixed(1);
        return Math.round(pct).toString();
    }, [total]);

    const chartData = useMemo(() => {
        return data.map((item, index) => ({
            ...item,
            index,
            percentage: getPercentage(item.count),
        }));
    }, [data, getPercentage]);

    const hoverIndex = activeIndex ?? legendHoverIndex;

    const handlePieMouseMove = useCallback((e: any) => {
        if (typeof e?.activeTooltipIndex === 'number') {
            setActiveIndex(e.activeTooltipIndex);
        }
    }, []);

    const handlePieMouseLeave = useCallback(() => {
        setActiveIndex(null);
    }, []);

    const handleLegendMouseEnter = useCallback((index: number) => {
        setLegendHoverIndex(index);
    }, []);

    const handleLegendMouseLeave = useCallback(() => {
        setLegendHoverIndex(null);
    }, []);

    const handleClick = useCallback((status: string) => {
        onStatusClick?.(status);
    }, [onStatusClick]);

    const centerContent = useMemo(() => {
        if (hoverIndex !== null && chartData[hoverIndex]) {
            const item = chartData[hoverIndex];
            return {
                percentage: `${item.percentage}%`,
                status: item.status,
                count: item.count,
                color: item.color,
                isHovered: true,
            };
        }
        return {
            percentage: null,
            status: 'Total tasks',
            count: total,
            color: '#111827',
            isHovered: false,
        };
    }, [hoverIndex, chartData, total]);

    const renderCustomShape = useCallback((props: any) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, index } = props;
        
        const isActive = hoverIndex === index;
        const isOther = hoverIndex !== null && hoverIndex !== index;
        const currentOuterRadius = isActive ? outerRadius + 6 : outerRadius;
        const currentOpacity = isOther ? 0.4 : 1;

        return (
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={currentOuterRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                opacity={currentOpacity}
                style={{
                    transition: 'all 150ms ease-out',
                    filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
                    cursor: onStatusClick ? 'pointer' : 'default',
                }}
            />
        );
    }, [hoverIndex, onStatusClick]);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tỷ lệ task theo trạng thái</h3>
            
            <div className="flex items-center gap-8">
                <div className="relative w-48 h-48 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={INNER_RADIUS}
                                outerRadius={OUTER_RADIUS}
                                paddingAngle={2}
                                dataKey="count"
                                stroke="none"
                                isAnimationActive={false}
                                shape={renderCustomShape}
                                onMouseMove={handlePieMouseMove}
                                onMouseLeave={handlePieMouseLeave}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        onClick={() => handleClick(entry.status)}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span 
                            className="text-3xl font-bold transition-all duration-150"
                            style={{ color: centerContent.color }}
                        >
                            {centerContent.isHovered ? centerContent.percentage : centerContent.count.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 transition-all duration-150">
                            {centerContent.status}
                        </span>
                        {centerContent.isHovered && (
                            <span className="text-xs text-gray-400 mt-0.5">
                                {centerContent.count} tasks
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {chartData.map((item, index) => {
                        const isActive = hoverIndex === index;
                        const isOther = hoverIndex !== null && hoverIndex !== index;
                        
                        return (
                            <div
                                key={item.status}
                                className="flex items-center gap-3 cursor-pointer transition-all duration-150"
                                style={{
                                    opacity: isOther ? 0.4 : 1,
                                    transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                                }}
                                onMouseEnter={() => handleLegendMouseEnter(index)}
                                onMouseLeave={handleLegendMouseLeave}
                                onClick={() => handleClick(item.status)}
                            >
                                <div
                                    className="w-3 h-3 rounded-full flex-shrink-0 transition-transform duration-150"
                                    style={{ 
                                        backgroundColor: item.color,
                                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                                    }}
                                />
                                <span className="text-sm text-gray-700">
                                    {item.status}: <span className="font-semibold">{item.count}</span>
                                    {isActive && (
                                        <span className="text-gray-400 ml-1">({item.percentage}%)</span>
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TaskStatusDonutChart;
