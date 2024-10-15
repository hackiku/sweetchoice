// app/components/ecom/RecommendedProducts.tsx

import React, { useRef, useEffect } from 'react';
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

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;

		const handleScroll = () => {
			if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
				scrollContainer.scrollLeft = 0;
			}
		};

		scrollContainer.addEventListener('scroll', handleScroll);
		return () => scrollContainer.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="w-full relative">
			<div
				ref={scrollContainerRef}
				className="flex overflow-x-scroll whitespace-nowrap pb-4"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				<div className="inline-flex">
					{[...products, ...products].map((product, index) => (
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