// app/components/about/MobileVideo.tsx

import React, { useState } from 'react';

const MobileVideo = () => {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div className="relative w-full md:w-1/3 md:absolute md:right-12 md:top-44 md:z-0 px-6 sm:px-8 md:px-12 mt-8 md:mt-0">
			<div
				className="relative w-[280px] mx-auto md:mx-0 transform rotate-6"
			>
				{/* Phone frame */}
				<div className="relative border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
					{/* Video container with proper mobile aspect ratio */}
					<div className="relative pt-[177.78%]"> {/* 16:9 aspect ratio */}
						<video
							src="/assets/tiktok.mp4"
							className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
							playsInline
							autoPlay
							muted
							loop
						/>
					</div>

					{/* Decorative elements */}
					<div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-black rounded-full"></div>

					{/* Play/Pause overlay */}
					<button
						onClick={() => setIsPlaying(!isPlaying)}
						className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-200"
					>
						<span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
					</button>
				</div>

				{/* Decorative background shape */}
				<div
					className="absolute -z-10 top-4 left-4 w-full h-full rounded-xl"
					style={{
						background: 'repeating-linear-gradient(45deg, #FF6B6B, #FF6B6B 10px, #FF8787 10px, #FF8787 20px)',
					}}
				></div>
			</div>
		</div>
	);
};

export default MobileVideo;