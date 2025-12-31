import React from 'react';
import type { MenuItem } from '../../data/menu.data';
import { ChevronIcon, LogoutIcon } from '../../components/all/SidebarIcons';

interface SidebarViewProps {
    isCollapsed: boolean;
    activeItem: string;
    menuItems: MenuItem[];
    onToggle: () => void;
    onMenuClick: (id: string) => void;
    onLogout: () => void;
}

const SidebarView: React.FC<SidebarViewProps> = ({
    isCollapsed,
    activeItem,
    menuItems,
    onToggle,
    onMenuClick,
    onLogout,
}) => {
    return (
        <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300 ${isCollapsed ? 'w-[70px]' : 'w-[250px]'}`}>
            <button
                onClick={onToggle}
                className="absolute -right-3 top-[180px] w-6 h-6 bg-gradient-to-r from-[#F79E61] to-[#f0884a] rounded-md shadow-md 
                           flex items-center justify-center cursor-pointer z-10
                           hover:from-[#e88d50] hover:to-[#e07d3a] hover:shadow-lg
                           transition-all duration-200 active:scale-95"
            >
                <ChevronIcon isCollapsed={isCollapsed} />
            </button>
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">NB</div>
                {!isCollapsed && (
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-gray-800 truncate">Nguyễn Bảo Thành</span>
                        <span className="text-xs text-gray-500">BA</span>
                    </div>
                )}
            </div>
            <nav className="flex-1 py-4 overflow-y-auto">
                <ul className="flex flex-col gap-1 px-3">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button onClick={() => onMenuClick(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all text-left ${activeItem === item.id ? 'bg-orange-50 text-orange-500 border-l-[3px] border-orange-500 -ml-[3px] pl-[15px]' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <span className="flex-shrink-0">{item.icon}</span>
                                {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-3 border-t border-gray-100">
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all">
                    <LogoutIcon />
                    {!isCollapsed && <span className="text-sm font-medium">Đăng xuất</span>}
                </button>
            </div>
        </aside>
    );
};

export default SidebarView;
