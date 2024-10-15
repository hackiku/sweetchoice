// app/components/about/ProductScroller.tsx

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import { Tooltip } from '~/components/ui/Tooltip';

interface Product {
	id: string;
	title: string;
	handle: string;
	images: {
		nodes: {
			url: string;
			altText: string;
			width: number;
			height: number;
		}[];
	};
}

interface ProductScrollerProps {
	products: Product[];
}

const ProductScroller: React.FC<ProductScrollerProps> = ({ products }) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isAutoScrolling, setIsAutoScrolling] = useState(true);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const layouts = useMemo(() => [
		[
			{ size: 'w-64 h-64', offset: 'translate-y-4' },
			{ size: 'w-56 h-56', offset: '-translate-y-2' },
			{ size: 'w-72 h-72', offset: 'translate-y-6' },
			{ size: 'w-60 h-60', offset: '-translate-y-4' },
			{ size: 'w-68 h-68', offset: 'translate-y-2' },
		],
		[
			{ size: 'w-60 h-60', offset: '-translate-y-2' },
			{ size: 'w-72 h-72', offset: 'translate-y-4' },
			{ size: 'w-56 h-56', offset: '-translate-y-4' },
			{ size: 'w-68 h-68', offset: 'translate-y-6' },
			{ size: 'w-64 h-64', offset: 'translate-y-2' },
		]
	], []);

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

	const renderProductRow = (rowProducts: Product[], layoutIndex: number) => (
		<div className="flex items-center h-3/4" onMouseDown={(e) => e.preventDefault()}>
			{rowProducts.map((product, index) => {
				const layout = layouts[layoutIndex][index % layouts[layoutIndex].length];
				return (
					<Link
						key={`${product.id}-${index}`}
						to={`/products/${product.handle}`}
						className={`${layout.size} ${layout.offset} flex-shrink-0 mx-2 relative group`}
						draggable={false}
					>
						<Tooltip content={product.title}>
							<div className="w-full h-full overflow-hidden border-4 border-black">
								<Image
									data={product.images.nodes[0]}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
									sizes="256px"
									draggable={false}
								/>
							</div>
						</Tooltip>
					</Link>
				);
			})}
		</div>
	);

	if (!products || products.length === 0) {
		return <div>No products available</div>;
	}

	const halfLength = Math.ceil(products.length / 2);
	const firstRow = products.slice(0, halfLength);
	const secondRow = products.slice(halfLength);

	return (
		<div className="w-full relative">
			<div
				ref={scrollContainerRef}
				className="overflow-x-scroll whitespace-nowrap pb-2 mb-2"
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
				<div className="inline-flex flex-col">
					{renderProductRow(firstRow, 0)}
					<div className="mt-4">
						{renderProductRow(secondRow, 1)}
					</div>
				</div>
			</div>

			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 bg-white border-4 border-black p-6 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
				<p className="text-xl font-bold mb-4">B2B holiday programs for supermarkets and mom & pop stores.</p>
				<Link
					to="/collections/all"
					className="inline-block w-full px-6 py-2 text-lg font-semibold border-2 border-black bg-[#ED1C24] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-200 mb-2"
				>
					All Products →
				</Link>
				<Link
					to="/contact"
					className="inline-block w-full px-6 py-2 text-lg font-semibold border-2 border-black bg-black text-white shadow-[4px_4px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_rgba(255,255,255,1)] transition-all duration-200"
				>
					Contact Us →
				</Link>
			</div>
		</div>
	);
};

export default ProductScroller;