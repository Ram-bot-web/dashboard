import { Home, Settings, X } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import SettingsModal from "./SettingsModal";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { colors, isDarkMode } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [{ icon: Home, label: "Dashboard", href: "#" }];

  const sidebarStyle = {
    backgroundColor: isDarkMode ? '#1f2937' : colors.dashboard,
    color: colors.text,
    boxShadow: isDarkMode 
      ? '4px 0 6px -1px rgba(0, 0, 0, 0.2), 2px 0 4px -1px rgba(0, 0, 0, 0.1)'
      : '4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -1px rgba(0, 0, 0, 0.06)',
    // borderRadius: '0 10px 10px 0'
  };

  const menuItemStyle = {
    color: colors.text,
    ':hover': {
      backgroundColor: `${colors.primary}10`
    }
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 z-50`}
        style={sidebarStyle}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4">
            <h1 className="text-xl font-bold" style={{ color: colors.text }}>
              Analytics Dashboard
            </h1>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md hover:bg-opacity-10 transition-colors"
              style={{ 
                color: colors.text,
                backgroundColor: `${colors.primary}10`
              }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-opacity-10"
                style={menuItemStyle}
              >
                <item.icon 
                  className="mr-3 h-5 w-5" 
                  style={{ color: colors.primary }}
                />
                {item.label}
              </a>
            ))}
            <button
              className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-opacity-10"
              onClick={() => setIsSettingsOpen(true)}
              style={menuItemStyle}
            >
              <Settings 
                className="mr-3 h-5 w-5" 
                style={{ color: colors.primary }}
              />
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default Sidebar;