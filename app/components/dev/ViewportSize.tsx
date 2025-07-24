// app/components/dev/ViewportSize.tsx

import React, { useState, useEffect } from 'react';

const ViewportSize: React.FC = () => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [showDimensions, setShowDimensions] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const updateSize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		};

		window.addEventListener('resize', updateSize);
		updateSize();
		setMounted(true);

		return () => window.removeEventListener('resize', updateSize);
	}, []);

	// Only show in development
	const isDev = process.env.NODE_ENV === 'development';

	if (!isDev || !mounted) return null;

	return (
		<button
			className="fixed bottom-2 right-2 z-[100] 
                 rounded-lg border border-zinc-800 bg-zinc-900/95 px-3 py-2 
                 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors
                 shadow-lg"
			onClick={() => setShowDimensions(!showDimensions)}
		>
			<div className="flex items-center gap-2 font-mono text-sm text-zinc-400">
				{showDimensions && (
					<>
						<span className="tabular-nums text-zinc-200">
							{width}x{height}
						</span>
						<span className="text-zinc-600">|</span>
					</>
				)}

				<span className="inline sm:hidden text-zinc-200 font-semibold">xs</span>
				<span className="hidden sm:inline md:hidden text-zinc-200 font-semibold">sm</span>
				<span className="hidden md:inline lg:hidden text-zinc-200 font-semibold">md</span>
				<span className="hidden lg:inline xl:hidden text-zinc-200 font-semibold">lg</span>
				<span className="hidden xl:inline 2xl:hidden text-zinc-200 font-semibold">xl</span>
				<span className="hidden 2xl:inline text-zinc-200 font-semibold">2xl</span>
			</div>
		</button>
	);
};

export default ViewportSize;