import type { ReactNode } from 'react';
interface MainLayoutViewProps {
    children: ReactNode;
    isSidebarCollapsed: boolean;
    onSidebarToggle: () => void;
    onLogout: () => void;
    onAddJob: () => void;
    onAddProject: () => void;
    onBack?: () => void;
    onTimeline?: () => void;
    isJobPage: boolean;
    isChartPage?: boolean;
    isDashboardPage?: boolean;
    showBackButton?: boolean;
    title?: string;
    onDateRangeChange?: (range: { startDate: Date; endDate: Date }) => void;
    dateRange?: { startDate: Date; endDate: Date };
    projects?: { id: string; code: string; name: string }[];
    selectedProjects?: string[];
    onProjectFilterChange?: (projectIds: string[]) => void;
}
const MainLayoutView: React.FC<MainLayoutViewProps> = ({
    children,
    isSidebarCollapsed,
    onSidebarToggle,
    onLogout,
    onAddJob,
    onAddProject,
    onBack,
    onTimeline,
    isJobPage,
    isChartPage = false,
    isDashboardPage = false,
    showBackButton = false,
    title,
    onDateRangeChange,
    dateRange,
    projects = [],
    selectedProjects = [],
    onProjectFilterChange,
}) => {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <SidebarContainer isCollapsed={isSidebarCollapsed} onToggle={onSidebarToggle} onLogout={onLogout} />
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarCollapsed ? 'ml-[70px]' : 'ml-[250px]'}`}>
                <Header
                    title={title}
                    onBack={onBack}
                    onAddJob={onAddJob}
                    onAddProject={onAddProject}
                    onTimeline={onTimeline}
                    isJobPage={isJobPage}
                    isChartPage={isChartPage}
                    isDashboardPage={isDashboardPage}
                    showBackButton={showBackButton}
                    onDateRangeChange={onDateRangeChange}
                    dateRange={dateRange}
                    projects={projects}
                    selectedProjects={selectedProjects}
                    onProjectFilterChange={onProjectFilterChange}
                />
                <main className={`flex-1 overflow-y-auto ${isChartPage ? '' : 'p-6'}`}>{children}</main>
            </div>
        </div>
    );
};
import { Sidebar as SidebarContainer } from '../../components/all';
import Header from '../../components/all/Header';
export default MainLayoutView;
