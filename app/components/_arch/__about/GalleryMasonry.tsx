// app/components/about/GalleryMasonry.tsx

import React, { useEffect, useState, useRef } from 'react';
import ToggleSwitch from '~/components/ui/ToggleSwitch';
import MobileVideo from './MobileVideo';

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
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const imageAssets: Asset[] = [
		{ type: 'image', src: '/about/image1.jpg', width: 800, height: 600 },
		{ type: 'image', src: '/about/image2.jpg', width: 600, height: 800 },
		{ type: 'image', src: '/about/image3.jpg', width: 700, height: 700 },
		{ type: 'image', src: '/about/image4.jpg', width: 900, height: 600 },
	];

	const videoAsset: Asset = { type: 'video', src: '/about/tiktok.mp4', width: 1080, height: 1920 };

	const galleryAssets = [...imageAssets, videoAsset, ...imageAssets];

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer || !isAutoScrolling) return;

		const scrollStep = () => {
			scrollContainer.scrollLeft += 1;
			if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
				scrollContainer.scrollLeft = 0;
			}
		};

		const intervalId = setInterval(scrollStep, 20);

		return () => clearInterval(intervalId);
	}, [isAutoScrolling]);

	const handleAssetClick = (asset: Asset, index: number) => {
		setModalContent(asset);
		setCurrentImageIndex(index);
	};

	const closeModal = () => {
		setModalContent(null);
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		setIsAutoScrolling(false);
		setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
		setScrollLeft(scrollContainerRef.current!.scrollLeft);
	};

	const handleMouseLeave = () => {
		setIsDragging(false);
		setIsAutoScrolling(true);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		setIsAutoScrolling(true);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - scrollContainerRef.current!.offsetLeft;
		const walk = (x - startX) * 2;
		scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
	};

	const handlePrevImage = () => {
		setCurrentImageIndex((prev) => (prev === 0 ? galleryAssets.length - 1 : prev - 1));
		setModalContent(galleryAssets[currentImageIndex]);
	};

	const handleNextImage = () => {
		setCurrentImageIndex((prev) => (prev === galleryAssets.length - 1 ? 0 : prev + 1));
		setModalContent(galleryAssets[currentImageIndex]);
	};

	const getRandomSize = () => {
		const sizes = [56, 64, 72, 80];
		return sizes[Math.floor(Math.random() * sizes.length)];
	};

	const getRandomOffset = () => {
		return Math.floor(Math.random() * 16) - 8;
	};

	return (
		<div className="relative w-full">
			<div
				ref={scrollContainerRef}
				className="overflow-x-scroll whitespace-nowrap"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', userSelect: 'none' }}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				onTouchStart={(e) => {
					setIsDragging(true);
					setIsAutoScrolling(false);
					setStartX(e.touches[0].pageX - scrollContainerRef.current!.offsetLeft);
					setScrollLeft(scrollContainerRef.current!.scrollLeft);
				}}
				onTouchMove={(e) => {
					if (!isDragging) return;
					const x = e.touches[0].pageX - scrollContainerRef.current!.offsetLeft;
					const walk = (x - startX) * 2;
					scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
				}}
				onTouchEnd={() => {
					setIsDragging(false);
					setIsAutoScrolling(true);
				}}
			>
				<div className="inline-flex">
					{galleryAssets.map((asset, index) => {
						const size = getRandomSize();
						const offsetX = getRandomOffset();
						const offsetY = getRandomOffset();

						return (
							<div
								key={index}
								className={`inline-block p-2 cursor-pointer h-${size} w-${size}`}
								style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
								onClick={() => handleAssetClick(asset, index % galleryAssets.length)}
							>
								{asset.type === 'image' ? (
									<img
										src={asset.src}
										alt={`Gallery item ${index + 1}`}
										className="w-full h-full object-cover"
										style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
										draggable={false}
									/>
								) : (
									<MobileVideo src={asset.src} />
								)}
							</div>
						);
					})}
				</div>
			</div>

			<div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2 items-center p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
				<span className="text-lg font-semibold">Scroll</span>
				<ToggleSwitch checked={isAutoScrolling} onChange={setIsAutoScrolling} />
			</div>

			{modalContent && (
				<div
					className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
					onClick={closeModal}
				>
					<div
						className="max-w-[90vw] max-h-[90vh] overflow-hidden relative"
						onClick={(e) => e.stopPropagation()}
					>
						{modalContent.type === 'image' ? (
							<img src={modalContent.src} alt="Enlarged view" className="w-full h-full object-contain" />
						) : (
							<MobileVideo src={modalContent.src} isEnlarged={true} />
						)}
						<div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
							<button onClick={handlePrevImage} className="bg-white text-black px-4 py-2 rounded-full">←</button>
							<button onClick={handleNextImage} className="bg-white text-black px-4 py-2 rounded-full">→</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GalleryMasonry;