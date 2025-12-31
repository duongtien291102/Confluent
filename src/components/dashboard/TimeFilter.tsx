import React from 'react';
import type { TimeFilterType } from '../../data/dashboard.data';

interface TimeFilterProps {
    activeFilter: TimeFilterType;
    onFilterChange: (filter: TimeFilterType) => void;
}

const filters: { value: TimeFilterType; label: string }[] = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
];

const TimeFilter: React.FC<TimeFilterProps> = ({ activeFilter, onFilterChange }) => {
    return (
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${activeFilter === filter.value
                            ? 'bg-gray-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

export default TimeFilter;
