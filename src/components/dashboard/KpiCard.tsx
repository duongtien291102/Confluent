import React from 'react';
import type { KpiStat } from '../../data/dashboard.data';

interface KpiCardProps {
    stat: KpiStat;
}

const KpiCard: React.FC<KpiCardProps> = ({ stat }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg px-6 py-4 flex items-center justify-between hover:shadow-sm transition-shadow">
            <span className="text-gray-700 text-sm font-medium">{stat.label}</span>
            <span className="text-gray-900 text-xl font-bold">{stat.value}</span>
        </div>
    );
};

interface KpiCardsGridProps {
    stats: KpiStat[];
}

export const KpiCardsGrid: React.FC<KpiCardsGridProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <KpiCard key={stat.id} stat={stat} />
            ))}
        </div>
    );
};

export default KpiCard;
