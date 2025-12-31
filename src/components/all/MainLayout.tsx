import { useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayoutView from '../../views/all/MainLayoutView';

interface MainLayoutProps {
    children: ReactNode;
    onLogout?: () => void;
    onAddJob?: () => void;
    onAddProject?: () => void;
    onBack?: () => void;
    onTimeline?: () => void;
    onDateRangeChange?: (range: { startDate: Date; endDate: Date }) => void;
    dateRange?: { startDate: Date; endDate: Date };
    projects?: { id: string; code: string; name: string }[];
    selectedProjects?: string[];
    onProjectFilterChange?: (projectIds: string[]) => void;
}
const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    onLogout,
    onAddJob,
    onAddProject,
    onBack,
    onTimeline,
    onDateRangeChange,
    dateRange,
    projects = [],
    selectedProjects = [],
    onProjectFilterChange,
}) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const location = useLocation();
    const getPageTitle = (pathname: string) => {
        if (pathname.match(/^\/job\/[^/]+$/)) {
            return 'Chi tiết công việc';
        }
        if (pathname === '/job/timeline') {
            return 'Dòng thời gian';
        }
        if (pathname === '/chart') {
            return 'Báo cáo';
        }
        if (pathname.includes('/job')) {
            return 'Danh sách công việc';
        }
        return 'Trang chủ';
    };
    const isJobPage = location.pathname === '/job';
    const isJobDetailPage = location.pathname.match(/^\/job\/[^/]+$/);
    const isTimelinePage = location.pathname === '/job/timeline';
    const isChartPage = location.pathname === '/chart';
    const isDashboardPage = location.pathname === '/dashboard' || location.pathname === '/';
    return (
        <MainLayoutView
            isSidebarCollapsed={isSidebarCollapsed}
            onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onLogout={onLogout || (() => { })}
            onAddJob={onAddJob || (() => { })}
            onAddProject={onAddProject || (() => { })}
            onBack={onBack}
            onTimeline={onTimeline}
            isJobPage={isJobPage}
            isChartPage={isChartPage}
            isDashboardPage={isDashboardPage}
            showBackButton={!!(isJobDetailPage || isTimelinePage)}
            title={getPageTitle(location.pathname)}
            onDateRangeChange={onDateRangeChange}
            dateRange={dateRange}
            projects={projects}
            selectedProjects={selectedProjects}
            onProjectFilterChange={onProjectFilterChange}
        >
            {children}
        </MainLayoutView>
    );
};
export default MainLayout;
