import { useNavigate, useLocation } from 'react-router-dom';
import SidebarView from '../../views/all/SidebarView';
import { defaultMenuItems } from '../../views';
interface SidebarProps {
    isCollapsed?: boolean;
    onToggle?: () => void;
    onLogout?: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const getActiveItem = () => {
        const path = location.pathname;
        if (path.includes('/dashboard')) return 'home';
        if (path.includes('/job')) return 'tasks';
        if (path.includes('/projects')) return 'projects';
        if (path.includes('/calendar')) return 'calendar';
        if (path.includes('/chart') || path.includes('/reports')) return 'reports';
        if (path.includes('/settings')) return 'settings';
        return 'home';
    };
    const handleMenuClick = (id: string) => {
        switch (id) {
            case 'home':
                navigate('/dashboard');
                break;
            case 'tasks':
                navigate('/job');
                break;
            case 'projects':
                navigate('/projects');
                break;
            case 'calendar':
                navigate('/calendar');
                break;
            case 'reports':
                navigate('/chart');
                break;
            case 'settings':
                navigate('/settings');
                break;
            default:
                break;
        }
    };
    return (
        <SidebarView
            isCollapsed={isCollapsed}
            activeItem={getActiveItem()}
            menuItems={defaultMenuItems}
            onToggle={onToggle || (() => { })}
            onMenuClick={handleMenuClick}
            onLogout={onLogout || (() => { })}
        />
    );
};
export default Sidebar;
