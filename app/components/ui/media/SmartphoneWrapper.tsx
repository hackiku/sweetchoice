// app/components/ui/media/SmartphoneWrapper.tsx

import React from 'react';

interface SmartphoneWrapperProps {
	imageSrc: string;
	imageAlt?: string;
	rotation?: string; // e.g., "rotate-6", "-rotate-12"
	size?: 'small' | 'medium' | 'large';
	className?: string;
}

const SmartphoneWrapper: React.FC<SmartphoneWrapperProps> = ({
	imageSrc = "/assets/images/palette-3.jpeg",
	imageAlt = "Smartphone display",
	rotation = "",
	size = "medium",
	className = ""
}) => {
	const sizeClasses = {
		small: "w-[200px]",
		medium: "w-[280px]",
		large: "w-[320px]"
	};

	return (
		<div className={`relative transform ${rotation} ${className}`}>
			{/* Phone frame */}
			<div className={`relative ${sizeClasses[size]} mx-auto border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white`}>
				{/* Screen container with mobile aspect ratio (16:9 rotated = 9:16) */}
				<div className="relative pt-[177.78%]">
					<img
						src={imageSrc}
						alt={imageAlt}
						className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
					/>
				</div>

				{/* Phone UI elements */}
				<div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-black rounded-full"></div>
				<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-400 rounded-full"></div>
			</div>

			{/* Decorative background shape */}
			<div
				className="absolute -z-10 top-4 left-4 w-full h-full rounded-xl"
				style={{
					background: 'repeating-linear-gradient(45deg, #FF6B6B, #FF6B6B 10px, #FF8787 10px, #FF8787 20px)',
				}}
			></div>
		</div>
	);
};

export default SmartphoneWrapper;