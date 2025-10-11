import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onKeyPress: (e: React.KeyboardEvent) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    onKeyPress,
}) => {
    return (
        <div className="px-6 my-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Enter ingredients..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyPress={onKeyPress}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </div>
        </div>
    );
};

export default SearchInput;
