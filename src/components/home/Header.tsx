import React from "react";

const Header = () => {
    return (
        <div className="text-center py-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
                <span className="relative inline-block">
                    C
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-black"></span>
                </span>
                <span className="relative inline-block">
                    h
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-black"></span>
                </span>
                <span>ef</span>
            </h1>
        </div>
    );
};

export default Header;
