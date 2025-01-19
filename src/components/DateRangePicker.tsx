import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, addDays, startOfMonth, isSameMonth, isSameDay } from 'date-fns';
import { useTheme } from '../context/ThemeContext';
import { filterDataByDateRange } from '../redux/slices/chartDataSlice';
import { useDispatch } from 'react-redux';

interface DateRangePickerProps {
  onChange: (range: { start: string; end: string }) => void;
}

type DateRange = {
  start: Date;
  end: Date;
};

const predefinedRanges = [
  { label: 'Last 7 Days', days: 7 },
  { label: 'Last 30 Days', days: 30 },
  { label: 'Last 90 Days', days: 90 },
  { label: 'This Month', days: 0 }, // Special case
];

const DateRangePicker = ({ onChange }: DateRangePickerProps) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: new Date(new Date().setDate(new Date().getDate() - 7)),
    end: new Date(),
  });

  const { colors, isDarkMode } = useTheme();

  const renderCalendarDays = () => {
    const days = [];
    const start = startOfWeek(startOfMonth(currentMonth));

    for (let i = 0; i < 42; i++) {
      const day = addDays(start, i);
      const isCurrentMonth = isSameMonth(day, currentMonth);
      const isSelected = 
        (selectedRange.start && isSameDay(day, selectedRange.start)) ||
        (selectedRange.end && isSameDay(day, selectedRange.end)) ||
        (selectedRange.start && 
         selectedRange.end && 
         day > selectedRange.start && 
         day < selectedRange.end);

      days.push(
        <button
          key={i}
          onClick={() => handleDateClick(day)}
          className={`
            w-8 h-8 rounded-full text-sm transition-colors
            ${!isCurrentMonth 
              ? 'text-gray-400 dark:text-gray-600' 
              : 'text-gray-900 dark:text-gray-100'
            } 
            ${isSelected 
              ? 'text-white' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
          style={{
            backgroundColor: isSelected ? colors.primary : 'transparent',
            color: isSelected ? '#fff' : isCurrentMonth ? colors.text : undefined
          }}
        >
          {format(day, 'd')}
        </button>
      );
    }
    return days;
  };

  const handleDateClick = (date: Date) => {
    setSelectedRange(prev => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: date };
      }
      if (date < prev.start) {
        return { start: date, end: prev.start };
      }
      return { start: prev.start, end: date };
    });
  };

  const handlePredefinedRange = (days: number) => {
    const end = new Date();
    let start: Date;

    if (days === 0) { // This Month
      start = startOfMonth(end);
    } else {
      start = new Date(end);
      start.setDate(end.getDate() - days);
    }

    setSelectedRange({ start, end });
    onChange({
      start: format(start, 'yyyy-MM-dd'),
      end: format(end, 'yyyy-MM-dd'),
    });
    // setIsOpen(false);
  };

  // const handleApply = () => {
  //   if (selectedRange.start && selectedRange.end) {
  //     onChange({
  //       start: format(selectedRange.start, 'yyyy-MM-dd'),
  //       end: format(selectedRange.end, 'yyyy-MM-dd'),
  //     });
  //     setIsOpen(false);
  //   }
  // };

  const handleApply = () => {
    if (selectedRange.start && selectedRange.end) {
      const dateRange = {
        start: format(selectedRange.start, 'yyyy-MM-dd'),
        end: format(selectedRange.end, 'yyyy-MM-dd'),
      };
      
      // Dispatch the filter action
      dispatch(filterDataByDateRange(dateRange));
      
      // Call the original onChange prop
      onChange(dateRange);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium transition-colors"
        style={{
          backgroundColor: colors.dashboard,
          color: colors.text,
          borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)',
          border: '1px solid'
        }}
      >
        <Calendar className="mr-2 h-4 w-4" style={{ color: colors.text }} />
        {selectedRange.start && selectedRange.end ? (
          `${format(selectedRange.start, 'MMM dd, yyyy')} - ${format(selectedRange.end, 'MMM dd, yyyy')}`
        ) : (
          'Select Date Range'
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-96 rounded-md shadow-lg ring-1 ring-opacity-5 z-50"
          style={{
            backgroundColor: colors.dashboard,
            borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)',
            // ringColor: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="p-4">
            {/* Predefined ranges */}
            <div 
              className="mb-4 pb-4"
              style={{
                borderBottom: '1px solid',
                borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)'
              }}
            >
              {predefinedRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => handlePredefinedRange(range.days)}
                  className="block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                  style={{ color: colors.text }}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Calendar header */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                className="p-1 rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="h-5 w-5" style={{ color: colors.text }} />
              </button>
              <span className="font-semibold" style={{ color: colors.text }}>
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                className="p-1 rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight className="h-5 w-5" style={{ color: colors.text }} />
              </button>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium"
                  style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.9)' : 'rgba(107, 114, 128, 0.9)' }}
                >
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>

            {/* Action buttons */}
            <div 
              className="flex justify-end space-x-2 pt-4"
              style={{
                borderTop: '1px solid',
                borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)'
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                style={{ color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 text-sm font-medium rounded text-white transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;