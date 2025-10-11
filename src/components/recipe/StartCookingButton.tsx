import React from "react";
import { ChefHat } from "lucide-react";

interface StartCookingButtonProps {
    onStartCooking: () => void;
}

const StartCookingButton: React.FC<StartCookingButtonProps> = ({
    onStartCooking,
}) => {
    return (
        <button
            onClick={onStartCooking}
            className="w-full bg-cyan-400 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-cyan-500 transition-colors mb-6"
        >
            Start Cooking!
            <ChefHat className="w-5 h-5" />
        </button>
    );
};

export default StartCookingButton;
