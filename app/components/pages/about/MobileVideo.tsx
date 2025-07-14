// app/components/about/MobileVideo.tsx

import React, { useState, useRef } from 'react';

const PlayIcon = () => (
	<div className="w-12 h-12 sm:w-16 sm:h-16 bg-black border-2 border-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8 5V19L19 12L8 5Z" fill="white" />
		</svg>
	</div>
);

const CloseButton = ({ onClick }) => (
	<button
		onClick={onClick}
		className="absolute -right-4 -top-4 w-10 h-10 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 z-50"
		aria-label="Close video"
	>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	</button>
);

const VideoModal = ({ isOpen, onClose, videoSrc }) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
			onClick={onClose}
		>
			<div
				className="relative max-w-md w-full"
				onClick={e => e.stopPropagation()}
			>
				<CloseButton onClick={onClose} />
				<video
					className="w-full h-[90vh] object-contain bg-black rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
					src={videoSrc}
					controls
					playsInline
					autoPlay
				/>
			</div>
		</div>
	);
};

const MobileVideo = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const videoSrc = "/assets/tiktok.mp4";

	return (
		<>
			<div className="relative w-full md:w-1/3 md:absolute md:right-12 md:top-44 md:z-0 px-6 sm:px-8 md:px-12 mt-8 md:mt-0">
				<div className="relative w-[280px] mx-auto md:mx-0 transform rotate-6">
					{/* Phone frame */}
					<div className="relative border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
						{/* Video container with proper mobile aspect ratio */}
						<div className="relative pt-[177.78%]">
							<video
								src={videoSrc}
								className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
								playsInline
								autoPlay
								muted
								loop
							/>
						</div>

						{/* Decorative elements */}
						<div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-black rounded-full"></div>

						{/* Play button overlay */}
						<button
							onClick={() => setIsModalOpen(true)}
							className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-200"
							aria-label="Open video"
						>
							<PlayIcon />
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

			<VideoModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				videoSrc={videoSrc}
			/>
		</>
	);
};

export default MobileVideo;