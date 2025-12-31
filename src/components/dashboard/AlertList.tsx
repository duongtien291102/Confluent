import React from 'react';
import type { AlertItem } from '../../data/dashboard.data';

interface AlertListProps {
    alerts: AlertItem[];
}

const AlertIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh sách cảnh báo</h3>
            <div className="space-y-3">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className="flex items-center gap-3 px-4 py-3 bg-orange-400 text-white rounded-lg cursor-pointer hover:bg-orange-500 transition-colors"
                    >
                        <div className="flex-shrink-0">
                            <AlertIcon />
                        </div>
                        <span className="text-sm font-medium">
                            {alert.taskCode} {alert.message} (dự án {alert.projectCode})
                        </span>
                    </div>
                ))}
                {alerts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <div className="text-3xl mb-2">✅</div>
                        <p className="text-sm">Không có cảnh báo</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertList;
