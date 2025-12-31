import React from 'react';
import type { PriorityItem } from '../../data/dashboard.data';

interface PriorityListProps {
    data: PriorityItem[];
}

const PriorityList: React.FC<PriorityListProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Số lượng task theo mức độ ưu tiên</h3>
            <div className="space-y-3">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between py-2"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-gray-700">{item.priority}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PriorityList;
