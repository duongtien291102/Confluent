// Dashboard Mock Data
// Dữ liệu mẫu cho trang Dashboard

// KPI Stats
export interface KpiStat {
    id: string;
    label: string;
    value: number;
}

export const mockKpiStats: KpiStat[] = [
    { id: '1', label: 'Tổng số dự án', value: 9 },
    { id: '2', label: 'Tổng số người tham gia', value: 9 },
    { id: '3', label: 'Dự án hoàn thành', value: 9 },
    { id: '4', label: 'Dự án đang thực hiện', value: 9 },
];

export interface ProductivityData {
    project: string;
    totalTasks: number;
    completedTasks: number;
}

export const mockProductivityData: ProductivityData[] = [
    { project: 'Dự án 1', totalTasks: 5, completedTasks: 20 },
    { project: 'Dự án 2', totalTasks: 27, completedTasks: 25 },
    { project: 'Dự án 3', totalTasks: 20, completedTasks: 8 },
    { project: 'Dự án 4', totalTasks: 8, completedTasks: 5 },
    { project: 'Dự án 5', totalTasks: 35, completedTasks: 15 },
    { project: 'Dự án 6', totalTasks: 30, completedTasks: 8 },
    { project: 'Dự án 7', totalTasks: 8, completedTasks: 5 },
    { project: 'Dự án 8', totalTasks: 27, completedTasks: 18 },
    { project: 'Dự án 9', totalTasks: 18, completedTasks: 10 },
];

// Alert Data
export interface AlertItem {
    id: string;
    taskCode: string;
    projectCode: string;
    message: string;
}

export const mockAlerts: AlertItem[] = [
    { id: '1', taskCode: 'TK-005', projectCode: 'PRJ-003', message: 'trễ hạn' },
    { id: '2', taskCode: 'TK-009', projectCode: 'PRJ-005', message: 'trễ hạn' },
];

export interface PriorityItem {
    priority: string;
    count: number;
    color: string;
}

export const mockPriorityData: PriorityItem[] = [
    { priority: 'High', count: 3, color: '#EF4444' },
    { priority: 'Medium', count: 4, color: '#F97316' },
    { priority: 'Low', count: 2, color: '#22C55E' },
    { priority: 'None', count: 1, color: '#9CA3AF' },
];

// Task Status Data (for Donut Chart)
export interface TaskStatusItem {
    status: string;
    count: number;
    color: string;
}

export const mockTaskStatusData: TaskStatusItem[] = [
    { status: 'Backlog', count: 90, color: '#F97316' },
    { status: 'To Do', count: 975, color: '#A855F7' },
    { status: 'In Progress', count: 261, color: '#EC4899' },
    { status: 'Review', count: 12, color: '#3B82F6' },
    { status: 'Done', count: 387, color: '#22C55E' },
];

// Department Bar Chart Data
export interface DepartmentData {
    department: string;
    taskCount: number;
}

export const mockDepartmentData: DepartmentData[] = [
    { department: 'Dev', taskCount: 15 },
    { department: 'OP', taskCount: 7 },
    { department: 'BE', taskCount: 15 },
    { department: 'DA', taskCount: 10 },
    { department: 'Degis', taskCount: 23 },
    { department: 'Giấy tờ', taskCount: 5 },
    { department: 'Bảo vệ', taskCount: 15 },
];

// Time Filter Options
export type TimeFilterType = 'day' | 'week' | 'month' | 'year';

export const timeFilterOptions: { value: TimeFilterType; label: string }[] = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
];
