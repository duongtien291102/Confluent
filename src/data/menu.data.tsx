import React from 'react';
import {
    HomeIcon,
    TaskIcon,
    ProjectIcon,
    CalendarIcon,
    ReportIcon,
    SettingsIcon
} from '../components/all/SidebarIcons';

export interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

export const defaultMenuItems: MenuItem[] = [
    { id: 'home', label: 'Trang chủ', icon: <HomeIcon /> },
    { id: 'projects', label: 'Danh sách dự án', icon: <ProjectIcon /> },
    { id: 'tasks', label: 'Danh sách công việc', icon: <TaskIcon /> },
    { id: 'calendar', label: 'Lịch', icon: <CalendarIcon /> },
    { id: 'reports', label: 'Báo cáo', icon: <ReportIcon /> },
    { id: 'settings', label: 'Cài đặt', icon: <SettingsIcon /> },
];
