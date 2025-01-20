import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Bell, Menu, Sun, Moon, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const headerStyle = {
    backgroundColor: isDarkMode ? '#1f2937' : colors.dashboard,
    boxShadow: isDarkMode 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    color: colors.text
  };

  const buttonStyle = {
    color: colors.text,
    ':hover': {
      backgroundColor: `${colors.primary}10`,
      color: colors.primary
    }
  };

  const dropdownStyle = {
    backgroundColor: isDarkMode ? '#1f2937' : colors.dashboard,
    boxShadow: isDarkMode 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '10px'
  };

  const dropdownItemStyle = {
    color: colors.text,
    ':hover': {
      backgroundColor: `${colors.primary}10`,
      color: colors.primary
    }
  };

  return (
    <header className="shadow-sm" style={headerStyle}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md transition-colors hover:bg-opacity-10"
              style={buttonStyle}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md transition-colors hover:bg-opacity-10"
              style={buttonStyle}
              aria-label="Theme mode"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" style={{ color: colors.primary }} />
              ) : (
                <Moon className="h-6 w-6" style={{ color: colors.primary }} />
              )}
            </button>

            <button 
              className="p-2 rounded-md transition-colors hover:bg-opacity-10"
              style={buttonStyle}
              aria-label="Notification"
            >
              <Bell className="h-6 w-6" style={{ color: colors.primary }} />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-md transition-colors hover:bg-opacity-10"
                style={buttonStyle}
                aria-label="Profile"
              >
                <User className="h-6 w-6" style={{ color: colors.primary }} />
              </button>

              {isProfileOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 py-1 z-50"
                  style={dropdownStyle}
                >
                  {[
                    { href: '#profile', label: 'Your Profile' },
                    { href: '#settings', label: 'Settings' },
                    { href: '#signout', label: 'Sign out' }
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm transition-colors hover:bg-opacity-10"
                      style={dropdownItemStyle}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;