import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { KPIData } from '../../types';

interface KPICardProps {
  data: KPIData;
}

const KPICard = ({ data }: KPICardProps) => {
  const { label, value, change, changeType } = data;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
      <div className="mt-2 flex items-center">
        {changeType === 'increase' ? (
          <ArrowUpIcon className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDownIcon className="w-4 h-4 text-red-500" />
        )}
        <span
          className={`ml-2 text-sm font-medium ${
            changeType === 'increase' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
};

export default KPICard;