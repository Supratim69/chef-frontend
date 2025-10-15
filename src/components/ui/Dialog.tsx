import React from "react";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: "error" | "success" | "warning" | "info";
    showTips?: boolean;
    tips?: string[];
}

const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    title,
    message,
    type = "info",
    showTips = false,
    tips = [],
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case "error":
                return "❌";
            case "success":
                return "✅";
            case "warning":
                return "⚠️";
            default:
                return "ℹ️";
        }
    };

    const getHeaderColor = () => {
        switch (type) {
            case "error":
                return "text-red-600";
            case "success":
                return "text-green-600";
            case "warning":
                return "text-orange-600";
            default:
                return "text-cyan-600";
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case "error":
                return "border-red-200";
            case "success":
                return "border-green-200";
            case "warning":
                return "border-orange-200";
            default:
                return "border-cyan-200";
        }
    };

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
                className={`bg-white rounded-2xl shadow-xl max-w-md w-full border-2 ${getBorderColor()}`}
            >
                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{getIcon()}</span>
                        <h3
                            className={`text-lg font-semibold ${getHeaderColor()}`}
                        >
                            {title}
                        </h3>
                    </div>

                    {/* Message */}
                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {message}
                    </div>

                    {/* Tips */}
                    {showTips && tips.length > 0 && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm">💡</span>
                                <span className="text-sm font-medium text-gray-700">
                                    Tips for better results:
                                </span>
                            </div>
                            <ul className="text-xs text-gray-600 space-y-1">
                                {tips.map((tip, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="text-gray-400 mt-0.5">
                                            •
                                        </span>
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-cyan-400 text-white py-3 rounded-xl font-medium hover:bg-cyan-500 transition-colors"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
