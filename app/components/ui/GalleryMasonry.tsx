// app/components/ui/GalleryMasonry.tsx

import React, { useEffect, useState, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ToggleSwitch from '~/components/ui/ToggleSwitch';

interface Asset {
	type: 'image' | 'video';
	src: string;
}

interface GalleryMasonryProps {
	assets: Asset[];
}

const GalleryMasonry: React.FC<GalleryMasonryProps> = ({ assets }) => {
	const [isAutoScrolling, setIsAutoScrolling] = useState(true);
	const [modalContent, setModalContent] = useState<Asset | null>(null);
	const sliderRef = useRef<Slider | null>(null);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (isAutoScrolling && sliderRef.current) {
				sliderRef.current.slickNext();
			}
		}, 3000);

		return () => clearInterval(intervalId);
	}, [isAutoScrolling]);

	const handleAssetClick = (asset: Asset) => {
		setModalContent(asset);
	};

	const closeModal = () => {
		setModalContent(null);
	};

	const sliderSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		variableWidth: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	};

	return (
		<div className="relative w-full">
			<Slider ref={sliderRef} {...sliderSettings}>
				{assets.map((asset, index) => (
					<div key={index} className="px-2">
						<div
							className="cursor-pointer overflow-hidden rounded-lg shadow-lg"
							onClick={() => handleAssetClick(asset)}
							style={{ width: '300px', height: '400px' }}
						>
							{asset.type === 'image' ? (
								<img
									src={asset.src}
									alt={`Gallery item ${index + 1}`}
									className="w-full h-full object-cover"
								/>
							) : (
								<video
									src={asset.src}
									className="w-full h-full object-cover"
									muted
									loop
									playsInline
								/>
							)}
						</div>
					</div>
				))}
			</Slider>

			<div className="absolute bottom-4 right-4 z-10 flex flex-col items-center p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
				<span className="text-lg font-semibold mb-2">Scroll</span>
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