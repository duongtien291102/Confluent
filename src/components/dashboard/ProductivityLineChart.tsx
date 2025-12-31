import React, { useState, useCallback, useRef } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import type { ProductivityData } from '../../data/dashboard.data';

interface ProductivityLineChartProps {
    data: ProductivityData[];
}

interface TooltipData {
    x: number;
    y: number;
    projectName: string;
    value: number;
    lineName: string;
    lineColor: string;
}

interface DotConfig {
    dataKey: 'totalTasks' | 'completedTasks';
    lineName: string;
    lineColor: string;
}

const ProductivityLineChart: React.FC<ProductivityLineChartProps> = ({ data }) => {
    const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const showTooltip = useCallback((dotData: TooltipData) => {
        setTooltipData(dotData);
    }, []);

    const hideTooltip = useCallback(() => {
        setTooltipData(null);
    }, []);

    const createDotRenderer = (config: DotConfig) => {
        return (props: any) => {
            const { cx, cy, payload, index } = props;
            if (cx === undefined || cy === undefined || !payload) return null;

            const value = payload[config.dataKey];
            const projectName = payload.project;

            return (
                <g key={`${config.dataKey}-${index}`}>
                    <circle
                        cx={cx}
                        cy={cy}
                        r={16}
                        fill="transparent"
                        stroke="none"
                        style={{ cursor: 'default' }}
                        onMouseEnter={() => {
                            showTooltip({
                                x: cx,
                                y: cy,
                                projectName,
                                value,
                                lineName: config.lineName,
                                lineColor: config.lineColor,
                            });
                        }}
                        onMouseLeave={hideTooltip}
                    />
                    <circle
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill={config.lineColor}
                        stroke="#fff"
                        strokeWidth={2}
                        style={{ pointerEvents: 'none' }}
                    />
                </g>
            );
        };
    };

    const totalTasksDot = createDotRenderer({
        dataKey: 'totalTasks',
        lineName: 'Tổng số task trong dự án',
        lineColor: '#9CA3AF',
    });

    const completedTasksDot = createDotRenderer({
        dataKey: 'completedTasks',
        lineName: 'Số task đã hoàn thành',
        lineColor: '#1F2937',
    });

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Năng suất</h3>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span className="text-gray-600">Tổng số task trong dự án</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                        <span className="text-gray-600">Số task đã hoàn thành</span>
                    </div>
                </div>
            </div>

            <div 
                ref={containerRef}
                className="h-64 relative"
                style={{ 
                    isolation: 'isolate',
                }}
                onMouseLeave={hideTooltip}
            >
                <style>{`
                    .recharts-tooltip-cursor,
                    .recharts-active-dot,
                    .recharts-reference-line,
                    .recharts-reference-area {
                        display: none !important;
                        visibility: hidden !important;
                        pointer-events: none !important;
                    }
                `}</style>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="project"
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickLine={false}
                            padding={{ left: 0, right: 20 }}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickLine={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="totalTasks"
                            stroke="#9CA3AF"
                            strokeWidth={2}
                            dot={totalTasksDot}
                            activeDot={false}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="completedTasks"
                            stroke="#1F2937"
                            strokeWidth={2}
                            dot={completedTasksDot}
                            activeDot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>

                {tooltipData && (
                    <div
                        className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none"
                        style={{
                            left: tooltipData.x,
                            top: tooltipData.y - 60,
                            transform: 'translateX(-50%)',
                            zIndex: 9999,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <p className="font-medium text-white mb-1">{tooltipData.projectName}</p>
                        <p className="flex items-center gap-2">
                            <span
                                className="w-2 h-2 rounded-full inline-block"
                                style={{ backgroundColor: tooltipData.lineColor }}
                            />
                            <span className="text-gray-300">{tooltipData.lineName}:</span>
                            <span className="font-bold text-white">{tooltipData.value}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductivityLineChart;
