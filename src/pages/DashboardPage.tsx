import {
    mockKpiStats,
    mockProductivityData,
    mockAlerts,
    mockPriorityData,
    mockTaskStatusData,
    mockDepartmentData,
} from '../data/dashboard.data';
import {
    KpiCardsGrid,
    ProductivityLineChart,
    DepartmentBarChart,
    TaskStatusDonutChart,
    PriorityList,
    AlertList,
} from '../components/dashboard';

const DashboardPage: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* KPI Cards + Productivity Chart + Alert List */}
            <div className="grid grid-cols-12 grid-rows-[auto_auto] gap-4">
                {/* Left column: KPI Cards */}
                <div className="col-span-9">
                    <KpiCardsGrid stats={mockKpiStats} />
                </div>

                {/* Right column: Alert List spanning 2 rows */}
                <div className="col-span-3 row-span-2">
                    <AlertList alerts={mockAlerts} />
                </div>

                {/* Left column: Productivity Chart */}
                <div className="col-span-9">
                    <ProductivityLineChart data={mockProductivityData} />
                </div>
            </div>

            {/* Row 2: Priority + Task Status */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6">
                    <PriorityList data={mockPriorityData} />
                </div>
                <div className="col-span-6">
                    <TaskStatusDonutChart data={mockTaskStatusData} />
                </div>
            </div>

            {/* Row 3: Department Bar Chart */}
            <DepartmentBarChart data={mockDepartmentData} />
        </div>
    );
};

export default DashboardPage;
