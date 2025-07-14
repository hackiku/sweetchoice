// app/components/ui/Gallery.tsx

import React, { useState, useEffect } from 'react';

interface MediaItem {
	id: string;
	url: string;
	alt: string;
}

interface GalleryProps {
	media: MediaItem[];
}

const Gallery: React.FC<GalleryProps> = ({ media }) => {
	const [items, setItems] = useState<MediaItem[]>(media.slice(0, 10)); // Initial load of 10 items

	useEffect(() => {
		const handleScroll = () => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
				loadMoreItems();
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const loadMoreItems = () => {
		setItems((prevItems) => [
			...prevItems,
			...media.slice(prevItems.length, prevItems.length + 10),
		]);
	};

	return (
		<div className="gallery-container">
			{items.map((item) => (
				<div key={item.id} className="gallery-item">
					<img src={item.url} alt={item.alt} />
				</div>
			))}
		</div>
	);
};

export default Gallery;
