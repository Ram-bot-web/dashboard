import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { KPIData } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import React from 'react';

interface KPICardProps {
  data: KPIData;
}

const KPICard = ({ data }: KPICardProps) => {
  const { label, value, change, changeType } = data;
  const { isDarkMode, colors } = useTheme();

  // Compute styles based on theme
  const cardStyle = {
    backgroundColor: isDarkMode ? '#1f2937' : colors.dashboard,
    color: colors.text,
    borderColor: isDarkMode ? 'rgba(75, 85, 99, 1)' : 'rgba(229, 231, 235, 1)',
    boxShadow: isDarkMode 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 0 1px rgba(0, 0, 0, 0.06)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 0 1px rgba(0, 0, 0, 0.02)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
  };

  const hoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: isDarkMode 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15), 0 1px 0 1px rgba(0, 0, 0, 0.06)'
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 1px 0 1px rgba(0, 0, 0, 0.02)'
  };

  const labelStyle = {
    color: isDarkMode ? 'rgba(156, 163, 175, 1)' : 'rgba(107, 114, 128, 1)'
  };

  const valueStyle = {
    color: colors.text
  };

  const getChangeColor = () => {
    return changeType === 'increase' 
      ? { color: '#10B981' }  // green-500
      : { color: '#EF4444' }; // red-500
  };

  return (
    <div 
      className="rounded-lg p-6 border hover:cursor-pointer"
      style={cardStyle}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = cardStyle.boxShadow;
      }}
    >
      <h3 
        className="text-sm font-medium"
        style={labelStyle}
      >
        {label}
      </h3>
      
      <div className="mt-2 flex items-baseline">
        <p 
          className="text-2xl font-semibold"
          style={valueStyle}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
      
      <div className="mt-2 flex items-center">
        {changeType === 'increase' ? (
          <ArrowUpIcon 
            className="w-4 h-4" 
            style={getChangeColor()} 
          />
        ) : (
          <ArrowDownIcon 
            className="w-4 h-4" 
            style={getChangeColor()} 
          />
        )}
        <span
          className="ml-2 text-sm font-medium"
          style={getChangeColor()}
        >
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
};

export default React.memo(KPICard);