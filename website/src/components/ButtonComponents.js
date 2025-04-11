import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Glow Effect Button (Top button in the image)
export const GlowButton = ({ children, className = '', ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={`relative px-6 py-3 rounded-full bg-primary text-accent border border-secondary transition-all duration-300 ${isHovered ? 'animate-glow' : ''} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {children}
        </button>
    );
};
// Text Movement Button (Second button in the image)
export const TextMoveButton = ({ children, className = '', ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={`relative px-6 py-3 rounded-full bg-accent text-primary overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <span className={`inline-block transition-transform duration-300 ${isHovered ? '-translate-y-6' : ''}`}>
                {children}
            </span>
            <span className={`absolute left-0 w-full text-center transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-6'}`}>
                {children}
            </span>
        </button>
    );
};

// Truncated Text Button (Third button in the image)
export const TruncatedButton = ({ children, className = '', ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={`relative px-6 py-3 rounded-full bg-secondary text-accent overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <div className="flex items-center justify-center">
                <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isHovered ? 'max-w-16' : 'max-w-full'}`}>
                    {children}
                </span>
                <span className={`ml-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    BUTTON
                </span>
            </div>
        </button>
    );
};

// Side Highlight Button (Fourth button in the image)
export const SideHighlightButton = ({ children, className = '', ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={`relative px-6 py-3 rounded-full bg-accent text-primary transition-all duration-300 ${isHovered ? 'rounded-r-none' : ''} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <div
                className={`absolute top-0 right-0 h-full bg-black w-12 rounded-r-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            ></div>
        </button>
    );
};

export const IconOnlyButton = ({ children, icon, className = '', ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={`relative flex items-center justify-center px-6 py-3 rounded-full bg-[#8B5CF6] text-white transition-all duration-300 overflow-hidden ${className}`}
            style={{ width: '180px', height: '48px' }} // Fixed width and height
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {/* Text container - slides out when hovered */}
            <div 
                className={`flex items-center justify-center w-full absolute top-0 left-0 h-full transition-transform duration-300 ease-in-out ${
                    isHovered ? 'transform -translate-x-full opacity-0' : 'transform translate-x-0 opacity-100'
                }`}
            >
                <span>{children}</span>
            </div>

            {/* Icon container - becomes visible when hovered */}
            <div 
                className={`flex items-center justify-center w-full absolute top-0 right-0 h-full transition-transform duration-300 ease-in-out ${
                    isHovered ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0'
                }`}
            >
                {icon || <ArrowRight size={20} />}
            </div>
        </button>
    );
};

export default IconOnlyButton;