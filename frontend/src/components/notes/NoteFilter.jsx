import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search, X } from 'lucide-react';
import useThemeStore from '../../store/theme';
export const NoteFilter = ({ onFilter }) => {
  const [search, setSearch] = React.useState('');
  const { theme } = useThemeStore();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onFilter(value);
  };

  const handleClear = () => {
    setSearch('');
    onFilter('');
  };

  return (
    <div className='mb-16'>
      <div className="relative flex items-center gap-2" >
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2  ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          } h-4 w-4`} />
          <Input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={handleSearch}
            className={`pl-10 pr-4 py-2 w-full ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-gray-50 border-gray-200'
            } focus:border-blue-500 focus:ring-blue-500`}
          />
        </div>
        {search && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className={`${
              theme === 'dark'
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};