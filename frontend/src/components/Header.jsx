import { Search } from "lucide-react";

const Header = ({ title, subtitle, showSearch = false, onSearch }) => {
  return (
    <div className="bg-black/40 backdrop-blur-lg border-b border-blue-900/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">{title}</h1>
            {subtitle && <p className="text-blue-300 mt-2">{subtitle}</p>}
          </div>
          
          {showSearch && (
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-blue-900/20 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;