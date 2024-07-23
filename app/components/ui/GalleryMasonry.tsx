// app/components/ecom/GalleryMasonry.tsx

import React from 'react';

const aspectRatios = {
	desktop: 'w-full h-48',
	square: 'w-48 h-48',
	mobile: 'w-24 h-48',
};

const getRandomAspectRatio = (numTypes) => {
	const selectedRatios = Object.keys(aspectRatios).slice(0, numTypes);
	const ratio = selectedRatios[Math.floor(Math.random() * selectedRatios.length)];
	return aspectRatios[ratio];
};

const GalleryMasonry = ({ numAssets, numTypes }) => {
	// Split assets into subgrids
	const subgridSize = Math.ceil(numAssets / 4);
	const subgrids = Array.from({ length: 4 }, (_, subgridIndex) =>
		Array.from(
			{ length: subgridSize },
			(_, assetIndex) => subgridIndex * subgridSize + assetIndex
		).filter(index => index < numAssets)
	);

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{subgrids.map((subgrid, subgridIndex) => (
				<div key={subgridIndex} className="grid gap-4">
					{subgrid.map(index => (
						<div key={index}>
							<img
								className={`max-w-full rounded-lg ${getRandomAspectRatio(numTypes)}`}
								src="/rect-placeholder.png"
								alt="Placeholder"
							/>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default GalleryMasonry;
