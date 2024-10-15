// app/components/ui/GalleryMasonry.tsx

import React, { useEffect, useState, useRef } from 'react';
import ToggleSwitch from '~/components/ui/ToggleSwitch';

interface Asset {
	type: 'image' | 'video';
	src: string;
	width: number;
	height: number;
}

interface GalleryMasonryProps {
	assets: Asset[];
}

const GalleryMasonry: React.FC<GalleryMasonryProps> = ({ assets }) => {
	const [isAutoScrolling, setIsAutoScrolling] = useState(true);
	const [modalContent, setModalContent] = useState<Asset | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer || !isAutoScrolling) return;

		const scrollStep = () => {
			if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
				scrollContainer.scrollLeft = 0;
			} else {
				scrollContainer.scrollLeft += 1;
			}
		};

		const intervalId = setInterval(scrollStep, 20);

		return () => clearInterval(intervalId);
	}, [isAutoScrolling]);

	const handleAssetClick = (asset: Asset) => {
		setModalContent(asset);
	};

	const closeModal = () => {
		setModalContent(null);
	};

	return (
		<div className="relative w-full">
			<div
				ref={scrollContainerRef}
				className="overflow-x-scroll whitespace-nowrap"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				<div className="inline-flex">
					{assets.concat(assets).map((asset, index) => (
						<div
							key={index}
							className="inline-block p-2 cursor-pointer"
							onClick={() => handleAssetClick(asset)}
						>
							{asset.type === 'image' ? (
								<img
									src={asset.src}
									alt={`Gallery item ${index + 1}`}
									className="h-64 w-auto object-cover"
									style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
								/>
							) : (
								<video
									src={asset.src}
									className="h-64 w-auto object-cover"
									style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
									muted
									loop
									playsInline
								/>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2 items-center p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
				<span className="text-lg font-semibold mr-2">Scroll</span>
				<ToggleSwitch checked={isAutoScrolling} onChange={setIsAutoScrolling} />
			</div>

			{modalContent && (
				<div
					className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
					onClick={closeModal}
				>
					<div
						className="max-w-4xl max-h-[80vh] overflow-auto"
						onClick={(e) => e.stopPropagation()}
					>
						{modalContent.type === 'image' ? (
							<img src={modalContent.src} alt="Enlarged view" className="w-full h-auto" />
						) : (
							<video src={modalContent.src} controls className="w-full h-auto" autoPlay />
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default GalleryMasonry;