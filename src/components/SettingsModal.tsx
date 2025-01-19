import React from "react";
import { X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  colorOptions: Record<string, { shades: string[]; default: string }>;
}

const ColorPicker = ({
  label,
  value,
  onChange,
  colorOptions,
}: ColorPickerProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        {label}
      </h3>
      <div className="space-y-3">
        {Object.entries(colorOptions).map(([name, { shades }]) => (
          <div key={name} className="flex items-center gap-2">
            <span className="w-24 text-sm text-gray-600 dark:text-gray-300">
              {name}
            </span>
            <div className="flex gap-2">
              {shades.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-lg border-2 ${
                    value === color
                      ? "border-gray-900 dark:border-white scale-110"
                      : "border-transparent hover:scale-110"
                  } transition-all duration-200 shadow-sm`}
                  style={{ backgroundColor: color }}
                  onClick={() => onChange(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { colors, updateColors, isDarkMode, toggleDarkMode } = useTheme();

  const [tempColors, setTempColors] = React.useState(colors);

  const primaryColorOptions = {
    "Sky Blue": {
      shades: [
        "#f0f9ff",
        "#e0f2fe",
        "#bae6fd",
        "#7dd3fc",
        "#38bdf8",
        "#0ea5e9",
        "#0284c7",
        "#0369a1",
        "#075985",
        "#0c4a6e",
      ],
      default: "#0ea5e9",
    },
    Emerald: {
      shades: [
        "#ecfdf5",
        "#d1fae5",
        "#a7f3d0",
        "#6ee7b7",
        "#34d399",
        "#10b981",
        "#059669",
        "#047857",
        "#065f46",
        "#064e3b",
      ],
      default: "#10b981",
    },
    Violet: {
      shades: [
        "#f5f3ff",
        "#ede9fe",
        "#ddd6fe",
        "#c4b5fd",
        "#a78bfa",
        "#8b5cf6",
        "#7c3aed",
        "#6d28d9",
        "#5b21b6",
        "#4c1d95",
      ],
      default: "#8b5cf6",
    },
    Rose: {
      shades: [
        "#fff1f2",
        "#ffe4e6",
        "#fecdd3",
        "#fda4af",
        "#fb7185",
        "#f43f5e",
        "#e11d48",
        "#be123c",
        "#9f1239",
        "#881337",
      ],
      default: "#f43f5e",
    },
  };

  const dashboardColorOptions = {
    "Sky Blue": {
      shades: [
        "#f0f9ff",
        "#e0f2fe",
        "#bae6fd",
        "#7dd3fc",
        "#38bdf8",
        "#0ea5e9",
        "#0284c7",
        "#0369a1",
        "#075985",
        "#0c4a6e",
      ],
      default: "#0ea5e9",
    },
    Emerald: {
      shades: [
        "#ecfdf5",
        "#d1fae5",
        "#a7f3d0",
        "#6ee7b7",
        "#34d399",
        "#10b981",
        "#059669",
        "#047857",
        "#065f46",
        "#064e3b",
      ],
      default: "#10b981",
    },
    Violet: {
      shades: [
        "#f5f3ff",
        "#ede9fe",
        "#ddd6fe",
        "#c4b5fd",
        "#a78bfa",
        "#8b5cf6",
        "#7c3aed",
        "#6d28d9",
        "#5b21b6",
        "#4c1d95",
      ],
      default: "#8b5cf6",
    },
    Rose: {
      shades: [
        "#fff1f2",
        "#ffe4e6",
        "#fecdd3",
        "#fda4af",
        "#fb7185",
        "#f43f5e",
        "#e11d48",
        "#be123c",
        "#9f1239",
        "#881337",
      ],
      default: "#f43f5e",
    },
  };

  const backgroundColorOptions = {
    Neutral: {
      shades: [
        "#ffffff",
        "#f9fafb",
        "#f3f4f6",
        "#e5e7eb",
        "#d1d5db",
        "#9ca3af",
        "#6b7280",
        "#4b5563",
        "#374151",
        "#1f2937",
      ],
      default: "#ffffff",
    },
    "Sky Blue": {
      shades: [
        "#f0f9ff",
        "#e0f2fe",
        "#bae6fd",
        "#7dd3fc",
        "#38bdf8",
        "#0ea5e9",
        "#0284c7",
        "#0369a1",
        "#075985",
        "#0c4a6e",
      ],
      default: "#0ea5e9",
    },
    Emerald: {
      shades: [
        "#ecfdf5",
        "#d1fae5",
        "#a7f3d0",
        "#6ee7b7",
        "#34d399",
        "#10b981",
        "#059669",
        "#047857",
        "#065f46",
        "#064e3b",
      ],
      default: "#10b981",
    },
    Violet: {
      shades: [
        "#f5f3ff",
        "#ede9fe",
        "#ddd6fe",
        "#c4b5fd",
        "#a78bfa",
        "#8b5cf6",
        "#7c3aed",
        "#6d28d9",
        "#5b21b6",
        "#4c1d95",
      ],
      default: "#8b5cf6",
    },
    Rose: {
      shades: [
        "#fff1f2",
        "#ffe4e6",
        "#fecdd3",
        "#fda4af",
        "#fb7185",
        "#f43f5e",
        "#e11d48",
        "#be123c",
        "#9f1239",
        "#881337",
      ],
      default: "#f43f5e",
    },
  };

  const textColorOptions = {
    Gray: {
      shades: [
        "#f9fafb",
        "#f3f4f6",
        "#e5e7eb",
        "#d1d5db",
        "#9ca3af",
        "#6b7280",
        "#4b5563",
        "#374151",
        "#1f2937",
        "#111827",
      ],
      default: "#111827",
    },
    Slate: {
      shades: [
        "#f8fafc",
        "#f1f5f9",
        "#e2e8f0",
        "#cbd5e1",
        "#94a3b8",
        "#64748b",
        "#475569",
        "#334155",
        "#1e293b",
        "#0f172a",
      ],
      default: "#0f172a",
    },
  };

  React.useEffect(() => {
    setTempColors(colors);
  }, [isOpen, colors]);

  const handleSave = () => {
    updateColors(tempColors);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white font-medium">
                Dark Mode
              </span>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  isDarkMode ? "bg-primary-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Color Pickers */}
            <ColorPicker
              label="Primary Color"
              value={tempColors.primary}
              onChange={(color) =>
                setTempColors((prev) => ({ ...prev, primary: color }))
              }
              colorOptions={primaryColorOptions}
            />

            <ColorPicker
              label="Dashboard Color"
              value={tempColors.dashboard}
              onChange={(color) =>
                setTempColors((prev) => ({ ...prev, dashboard: color }))
              }
              colorOptions={dashboardColorOptions}
            />

            <ColorPicker
              label="Background Color"
              value={tempColors.background}
              onChange={(color) =>
                setTempColors((prev) => ({ ...prev, background: color }))
              }
              colorOptions={backgroundColorOptions}
            />

            <ColorPicker
              label="Text Color"
              value={tempColors.text}
              onChange={(color) =>
                setTempColors((prev) => ({ ...prev, text: color }))
              }
              colorOptions={textColorOptions}
            />

            {/* Preview */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Preview
              </h3>
              <div
                className="flex gap-4 p-4 border rounded-lg dark:border-gray-700"
                style={{ backgroundColor: tempColors.background }}
              >
                <div className="space-y-4" style={{ color: tempColors.text }}>
                  <h4 className="font-medium">Sample Content</h4>
                  <p>This is how your text will look.</p>
                  <button
                    className="btn-primary"
                    style={{ backgroundColor: tempColors.primary }}
                  >
                    Primary Button
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
              style={{ backgroundColor: tempColors.primary }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
