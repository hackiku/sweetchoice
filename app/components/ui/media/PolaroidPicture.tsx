// app/components/ui/media/PolaroidPicture.tsx

import React from 'react';

interface PolaroidPictureProps {
	imageSrc: string;
	imageAlt?: string;
	caption?: string;
	rotation?: string; // e.g., "rotate-6", "-rotate-12"
	size?: 'small' | 'medium' | 'large';
	className?: string;
}

const PolaroidPicture: React.FC<PolaroidPictureProps> = ({
	imageSrc = "/assets/images/palette-3.jpeg",
	imageAlt = "Polaroid style photo",
	caption = "",
	rotation = "",
	size = "medium",
	className = ""
}) => {
	const sizeClasses = {
		small: "w-[200px]",
		medium: "w-[250px]",
		large: "w-[300px]"
	};

	return (
		<div className={`relative transform ${rotation} ${className}`}>
			{/* Polaroid frame - classic white border with thick bottom */}
			<div className={`relative ${sizeClasses[size]} mx-auto bg-white p-4 pb-16 border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:scale-105 transition-transform duration-200`}>

				{/* Photo area - square aspect ratio like real polaroids */}
				<div className="relative w-full pt-[100%] bg-gray-100 border-2 border-gray-300 rounded-sm overflow-hidden">
					<img
						src={imageSrc}
						alt={imageAlt}
						className="absolute top-0 left-0 w-full h-full object-cover"
					/>
				</div>

				{/* Caption area - bottom white space */}
				{caption && (
					<div className="absolute bottom-4 left-4 right-4 text-center">
						<p className="text-lg font-semibold text-indigo-800">
							{caption}
						</p>
					</div>
				)}

				{/* Subtle aging effects */}
				<div className="absolute top-2 right-2 w-3 h-3 bg-yellow-100 rounded-full opacity-30"></div>
				<div className="absolute bottom-20 left-2 w-2 h-2 bg-yellow-100 rounded-full opacity-20"></div>
			</div>

			{/* Decorative background shape - different pattern from phone */}
			<div
				className="absolute -z-10 top-4 left-4 w-full h-full rounded-lg"
				style={{
					background: 'repeating-linear-gradient(135deg, #FFE135, #FFE135 8px, #FFD700 8px, #FFD700 16px)',
				}}
			></div>
		</div>
	);
};

export default PolaroidPicture;