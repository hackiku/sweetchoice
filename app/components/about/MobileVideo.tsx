// app/components/about/MobileVideo.tsx

import React, { useState } from 'react';

interface MobileVideoProps {
	src: string;
	isEnlarged?: boolean;
}

const MobileVideo: React.FC<MobileVideoProps> = ({ src, isEnlarged = false }) => {
	const [isPlaying, setIsPlaying] = useState(false);

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<div className={`relative ${isEnlarged ? 'w-full h-auto' : 'w-64 h-64'}`}>
			<video
				src={src}
				className={`w-full h-full object-cover ${isEnlarged ? '' : 'rounded-lg'}`}
				loop
				playsInline
				autoPlay={isEnlarged}
				muted={!isEnlarged}
				controls={isEnlarged}
			/>
			{!isEnlarged && (
				<button
					className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white"
					onClick={togglePlay}
				>
					{isPlaying ? 'Pause' : 'Play'}
				</button>
			)}
		</div>
	);
};

export default MobileVideo;