import { useState, useEffect } from 'react';
import { WidgetConfig } from '../types';

const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: 'revenue', type: 'revenue', position: 0 },
  { id: 'sales', type: 'sales', position: 1 },
  { id: 'customers', type: 'customers', position: 2 },
  { id: 'kpi', type: 'kpi', position: 3 },
];

export const useWidgetConfig = () => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(() => {
    const saved = localStorage.getItem('dashboardWidgets');
    return saved ? JSON.parse(saved) : DEFAULT_WIDGETS;
  });

  useEffect(() => {
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
  }, [widgets]);

  const updateWidgetPosition = (draggedId: string, newPosition: number) => {
    setWidgets(prevWidgets => {
      const updatedWidgets = [...prevWidgets];
      const draggedIndex = updatedWidgets.findIndex(w => w.id === draggedId);
      const widget = updatedWidgets[draggedIndex];
      
      // Remove widget from old position
      updatedWidgets.splice(draggedIndex, 1);
      // Insert at new position
      updatedWidgets.splice(newPosition, 0, widget);
      
      // Update positions
      return updatedWidgets.map((w, index) => ({
        ...w,
        position: index
      }));
    });
  };

  return { widgets, updateWidgetPosition };
};