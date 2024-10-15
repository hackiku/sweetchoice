// app/components/ecom/RecommendedProducts.tsx

import React, { useRef, useEffect, useState } from 'react';
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

interface RecommendedProductsProps {
	products: Product[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products }) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isAutoScrolling, setIsAutoScrolling] = useState(true);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

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

	const renderProductRow = (rowProducts: Product[]) => (
		<div className="flex">
			{[...rowProducts, ...rowProducts].map((product, index) => (
				<Link
					key={`${product.id}-${index}`}
					to={`/products/${product.handle}`}
					className="w-64 h-64 flex-shrink-0 mx-2 relative group"
				>
					<Tooltip content={product.title}>
						<div className="w-full h-full overflow-hidden border-4 border-black">
							<Image
								data={product.images.nodes[0]}
								className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
								sizes="256px"
							/>
						</div>
					</Tooltip>
				</Link>
			))}
		</div>
	);

	return (
		<div className="w-full relative">
			<div
				ref={scrollContainerRef}
				className="overflow-x-scroll whitespace-nowrap pb-4"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			>
				<div className="inline-flex flex-col">
					{renderProductRow(products.slice(0, products.length / 2))}
					<div className="mt-4">
						{renderProductRow(products.slice(products.length / 2))}
					</div>
				</div>
			</div>

			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 bg-white border-4 border-black p-6 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
				<p className="text-xl font-bold mb-4">B2B holiday programs for supermarkets and mom & pop stores.</p>
				<Link
					to="/collections/all"
					className="inline-block px-6 py-2 text-lg font-semibold border-2 border-black bg-[#ED1C24] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-200"
				>
					Products →
				</Link>
			</div>
		</div>
	);
};

export default RecommendedProducts;