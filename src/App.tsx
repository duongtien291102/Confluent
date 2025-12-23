import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { MainLayout, AddProjectModal } from './components';
import AddJobModal from './components/job/AddJobModal';
import { DashboardPage, LoginPage, JobListPage, JobDetailPage, TimelinePage, ChartPage } from './pages';
import { projectService, authService, jobService } from './services';
import type { User, CreateJobInput, CreateProjectInput } from './models';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };
  const handleAddJob = useCallback(async (input: CreateJobInput) => {
    try {
      await jobService.addJob(input);
      setIsJobModalOpen(false);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Failed to add job:', error);
    }
  }, []);
  const handleAddProject = useCallback(async (input: CreateProjectInput) => {
    try {
      await projectService.addProject(input);
      setIsProjectModalOpen(false);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  }, []);
  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <AppContent
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        isJobModalOpen={isJobModalOpen}
        isProjectModalOpen={isProjectModalOpen}
        refreshKey={refreshKey}
        handleLogout={handleLogout}
        handleAddJob={handleAddJob}
        handleAddProject={handleAddProject}
        setIsJobModalOpen={setIsJobModalOpen}
        setIsProjectModalOpen={setIsProjectModalOpen}
      />
    </BrowserRouter>
  );
};
const AppContent: React.FC<{
  isAuthenticated: boolean;
  currentUser: any;
  isJobModalOpen: boolean;
  isProjectModalOpen: boolean;
  refreshKey: number;
  handleLogout: () => void;
  handleAddJob: (input: any) => void;
  handleAddProject: (input: any) => void;
  setIsJobModalOpen: (open: boolean) => void;
  setIsProjectModalOpen: (open: boolean) => void;
}> = ({
  isAuthenticated,
  currentUser,
  isJobModalOpen,
  isProjectModalOpen,
  refreshKey,
  handleLogout,
  handleAddJob,
  handleAddProject,
  setIsJobModalOpen,
  setIsProjectModalOpen
}) => {
    const navigate = useNavigate();
    const [currentTimeFilter, setCurrentTimeFilter] = useState('all');
    
    const handleBack = () => {
      navigate('/job');
    };
    const handleTimeline = () => {
      navigate('/job/timeline');
    };
    
    const handleTimeFilterChange = (filter: string) => {
      setCurrentTimeFilter(filter);
    };
    if (!isAuthenticated) {
      return (
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={() => { }} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      );
    }
    return (
      <>
        <MainLayout
          onLogout={handleLogout}
          onAddJob={() => setIsJobModalOpen(true)}
          onAddProject={() => setIsProjectModalOpen(true)}
          onBack={handleBack}
          onTimeline={handleTimeline}
          onTimeFilterChange={handleTimeFilterChange}
          currentTimeFilter={currentTimeFilter}
        >
          <Routes>
            <Route path="/dashboard" element={<DashboardPage key={refreshKey} />} />
            <Route path="/chart" element={<ChartPage />} />
            <Route path="/job" element={<JobListPage />} />
            <Route path="/job/timeline" element={<TimelinePage />} />
            <Route path="/job/:id" element={<JobDetailPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </MainLayout>
        <AddJobModal
          isOpen={isJobModalOpen}
          onClose={() => setIsJobModalOpen(false)}
          onSubmit={handleAddJob}
          defaultManager={currentUser?.name || ''}
        />
        <AddProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onSubmit={handleAddProject}
          defaultManager={currentUser?.name || ''}
        />
      </>
    );
  }
export default App;
