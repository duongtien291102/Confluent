import { useState, useRef, useEffect } from 'react';

interface Project {
    id: string;
    code: string;
    name: string;
}

interface DateRange {
    startDate: Date;
    endDate: Date;
}

interface HeaderProps {
    title?: string;
    onBack?: () => void;
    onAddJob?: () => void;
    onAddProject?: () => void;
    onTimeline?: () => void;
    isJobPage?: boolean;
    showBackButton?: boolean;
    isChartPage?: boolean;
    isDashboardPage?: boolean;
    onDateRangeChange?: (range: DateRange) => void;
    dateRange?: DateRange;
    projects?: Project[];
    selectedProjects?: string[];
    onProjectFilterChange?: (projectIds: string[]) => void;
}

const MONTHS = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
const DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
};

const DateRangePicker: React.FC<{
    dateRange: DateRange;
    onChange: (range: DateRange) => void;
}> = ({ dateRange, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectingStart, setSelectingStart] = useState(true);
    const [tempStart, setTempStart] = useState<Date | null>(dateRange.startDate);
    const [tempEnd, setTempEnd] = useState<Date | null>(dateRange.endDate);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days: (Date | null)[] = [];

        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const handleDateClick = (date: Date) => {
        if (selectingStart) {
            setTempStart(date);
            setTempEnd(null);
            setSelectingStart(false);
        } else {
            if (tempStart && date >= tempStart) {
                setTempEnd(date);
                onChange({ startDate: tempStart, endDate: date });
                setIsOpen(false);
                setSelectingStart(true);
            } else {
                setTempStart(date);
                setTempEnd(null);
            }
        }
    };

    const isInRange = (date: Date) => {
        if (!tempStart || !tempEnd) return false;
        return date >= tempStart && date <= tempEnd;
    };

    const isStart = (date: Date) => tempStart && date.toDateString() === tempStart.toDateString();
    const isEnd = (date: Date) => tempEnd && date.toDateString() === tempEnd.toDateString();

    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

    const days = getDaysInMonth(currentMonth);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
            >
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 w-80">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="font-semibold text-gray-800">
                            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAYS.map(day => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {days.map((date, index) => {
                            if (!date) {
                                return <div key={`empty-${index}`} className="w-9 h-9" />;
                            }

                            const inRange = isInRange(date);
                            const start = isStart(date);
                            const end = isEnd(date);
                            const isToday = date.toDateString() === new Date().toDateString();

                            return (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => handleDateClick(date)}
                                    className={`w-9 h-9 text-sm rounded-lg transition-all ${
                                        start || end
                                            ? 'bg-orange-500 text-white font-medium'
                                            : inRange
                                            ? 'bg-orange-100 text-orange-700'
                                            : isToday
                                            ? 'bg-gray-100 text-gray-900 font-medium'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {date.getDate()}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                        <button
                            onClick={() => {
                                const today = new Date();
                                const weekAgo = new Date(today);
                                weekAgo.setDate(today.getDate() - 7);
                                onChange({ startDate: weekAgo, endDate: today });
                                setTempStart(weekAgo);
                                setTempEnd(today);
                            }}
                            className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            7 ngày
                        </button>
                        <button
                            onClick={() => {
                                const today = new Date();
                                const monthAgo = new Date(today);
                                monthAgo.setMonth(today.getMonth() - 1);
                                onChange({ startDate: monthAgo, endDate: today });
                                setTempStart(monthAgo);
                                setTempEnd(today);
                            }}
                            className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            30 ngày
                        </button>
                        <button
                            onClick={() => {
                                const today = new Date();
                                const yearAgo = new Date(today);
                                yearAgo.setFullYear(today.getFullYear() - 1);
                                onChange({ startDate: yearAgo, endDate: today });
                                setTempStart(yearAgo);
                                setTempEnd(today);
                            }}
                            className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            1 năm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProjectFilter: React.FC<{
    projects: Project[];
    selectedProjects: string[];
    onChange: (projectIds: string[]) => void;
}> = ({ projects, selectedProjects, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleProject = (projectId: string) => {
        if (selectedProjects.includes(projectId)) {
            onChange(selectedProjects.filter(id => id !== projectId));
        } else {
            onChange([...selectedProjects, projectId]);
        }
    };

    const handleSelectAll = () => {
        onChange([]);
    };

    const getDisplayText = () => {
        if (selectedProjects.length === 0) return 'Tất cả dự án';
        if (selectedProjects.length === 1) {
            const project = projects.find(p => p.id === selectedProjects[0]);
            return project?.name || 'Tất cả dự án';
        }
        return `${selectedProjects.length} dự án`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    selectedProjects.length > 0
                        ? 'bg-orange-50 border-orange-200 text-orange-700'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="max-w-[150px] truncate">{getDisplayText()}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="p-3 border-b border-gray-100">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm dự án..."
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                            />
                        </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                        <button
                            onClick={handleSelectAll}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                                selectedProjects.length === 0
                                    ? 'bg-orange-50 text-orange-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                selectedProjects.length === 0
                                    ? 'bg-orange-500 border-orange-500'
                                    : 'border-gray-300'
                            }`}>
                                {selectedProjects.length === 0 && (
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <span className="font-medium">Tất cả dự án</span>
                        </button>

                        {filteredProjects.map((project) => {
                            const isSelected = selectedProjects.includes(project.id);
                            return (
                                <button
                                    key={project.id}
                                    onClick={() => handleToggleProject(project.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                                        isSelected
                                            ? 'bg-orange-50 text-orange-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                        isSelected
                                            ? 'bg-orange-500 border-orange-500'
                                            : 'border-gray-300'
                                    }`}>
                                        {isSelected && (
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">{project.name}</div>
                                        <div className="text-xs text-gray-500">{project.code}</div>
                                    </div>
                                </button>
                            );
                        })}

                        {filteredProjects.length === 0 && (
                            <div className="px-4 py-6 text-center text-sm text-gray-500">
                                Không tìm thấy dự án
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({
    title = 'Trang chủ',
    onBack,
    onAddJob,
    onAddProject,
    onTimeline,
    isJobPage = false,
    showBackButton = false,
    isChartPage = false,
    isDashboardPage = false,
    onDateRangeChange,
    dateRange,
    projects = [],
    selectedProjects = [],
    onProjectFilterChange,
}) => {
    const defaultDateRange: DateRange = {
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        endDate: new Date(),
    };

    const handleButtonClick = () => {
        if (isJobPage) {
            onAddJob?.();
        } else {
            onAddProject?.();
        }
    };

    const buttonText = isJobPage ? 'Thêm Công việc' : 'Thêm Dự Án';

    return (
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-3">
                {showBackButton ? (
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Quay lại
                    </button>
                ) : (
                    <h1 className="text-base font-medium text-gray-800">{title}</h1>
                )}
            </div>

            {!showBackButton && (
                <div className="flex items-center gap-3">
                    {isChartPage || isDashboardPage ? (
                        <>
                            {projects.length > 0 && onProjectFilterChange && (
                                <ProjectFilter
                                    projects={projects}
                                    selectedProjects={selectedProjects}
                                    onChange={onProjectFilterChange}
                                />
                            )}
                            <DateRangePicker
                                dateRange={dateRange || defaultDateRange}
                                onChange={(range) => onDateRangeChange?.(range)}
                            />
                        </>
                    ) : (
                        <>
                            {isJobPage && (
                                <button
                                    onClick={onTimeline}
                                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                    </svg>
                                    <span>Timeline</span>
                                </button>
                            )}
                            <button onClick={handleButtonClick} className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                <span>{buttonText}</span>
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
