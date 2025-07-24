// app/components/ui/media/ImageStripedCutout.tsx

import React from 'react';

interface ImageStripedCutoutProps {
	imageSrc?: string;
	imageAlt?: string;
	rotation?: string; // e.g., "rotate-6", "-rotate-12"
	size?: 'small' | 'medium' | 'large';
	borderWidth?: 'thin' | 'medium' | 'thick';
	className?: string;
}

const ImageStripedCutout: React.FC<ImageStripedCutoutProps> = ({
	imageSrc = "/assets/images/palette-14.png",
	imageAlt = "Sweet Choice palette",
	rotation = "rotate-3",
	size = "medium",
	borderWidth = "medium",
	className = ""
}) => {
	const sizeClasses = {
		small: "w-[200px] h-[200px]",
		medium: "w-[280px] h-[280px]",
		large: "w-[350px] h-[350px]"
	};

	const borderWidthClasses = {
		thin: "p-3",
		medium: "p-6",
		thick: "p-8"
	};

	return (
		<div className={`relative transform ${rotation} ${className}`}>
			{/* Striped border container */}
			<div
				className={`relative ${sizeClasses[size]} ${borderWidthClasses[borderWidth]} rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black`}
				style={{
					background: 'repeating-linear-gradient(45deg, #00A86B, #00A86B 8px, #00C851 8px, #00C851 16px)',
				}}
			>
				{/* Inner container for the cutout image */}
				<div className="relative w-full h-full rounded-lg overflow-hidden bg-transparent">
					<img
						src={imageSrc}
						alt={imageAlt}
						className="w-full h-full object-contain drop-shadow-[4px_4px_8px_rgba(0,0,0,0.3)]"
						style={{
							filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
						}}
					/>
				</div>
			</div>

			{/* Decorative background shape */}
			<div
				className="absolute -z-10 top-4 left-4 w-full h-full rounded-xl"
				style={{
					background: 'repeating-linear-gradient(135deg, #4CAF50, #4CAF50 10px, #66BB6A 10px, #66BB6A 20px)',
				}}
			></div>
		</div>
	);
};

export default ImageStripedCutout;