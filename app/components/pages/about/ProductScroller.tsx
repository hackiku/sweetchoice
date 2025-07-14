// app/components/about/ProductScroller.tsx

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import { Tooltip } from '~/components/ui/Tooltip';
import BrutalButton from '~/components/ui/BrutalButton';
import { useContact } from '~/components/contact/ContactContext';
import { useTranslation } from '~/lib/i18n/useTranslation';

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
	const { t } = useTranslation();
	const { isOpen, openContact, closeContact } = useContact();
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const handleContactClick = () => {
		if (isOpen) {
			closeContact();
		} else {
			openContact();
		}
	};

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
		if (!scrollContainer) return;

		// Create duplicate content for seamless looping
		const content = scrollContainer.firstElementChild as HTMLElement;
		if (!content) return;

		const clone = content.cloneNode(true) as HTMLElement;
		scrollContainer.appendChild(clone);

		let animationFrameId: number;
		let lastTimestamp = 0;
		const speed = 0.18; // Pixels per millisecond

		const animate = (timestamp: number) => {
			if (!lastTimestamp) lastTimestamp = timestamp;
			const elapsed = timestamp - lastTimestamp;

			if (scrollContainer.scrollLeft >= content.offsetWidth) {
				scrollContainer.scrollLeft = 0;
			}
			scrollContainer.scrollLeft += elapsed * speed;

			lastTimestamp = timestamp;
			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	}, []);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
		setScrollLeft(scrollContainerRef.current!.scrollLeft);
	};

	const handleMouseLeave = () => {
		setIsDragging(false);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - scrollContainerRef.current!.offsetLeft;
		const walk = (x - startX) * 2;
		scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
	};

	// Duplicate products to ensure we have enough for smooth scrolling
	const duplicateProducts = useMemo(() => {
		const duplicated = [...products, ...products, ...products]; // Triple the products
		return duplicated;
	}, [products]);

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
							<div className="w-full h-full overflow-hidden border-4 border-black bg-[#FFF59F]">
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

	const halfLength = Math.ceil(duplicateProducts.length / 2);
	const firstRow = duplicateProducts.slice(0, halfLength);
	const secondRow = duplicateProducts.slice(halfLength);

	return (
		<div className="w-full relative">
			<div
				ref={scrollContainerRef}
				className="overflow-x-scroll whitespace-nowrap pb-2 -mb-16"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', userSelect: 'none' }}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			>
				<div className="inline-flex flex-col">
					{renderProductRow(firstRow, 0)}
					<div className="mt-4">
						{renderProductRow(secondRow, 1)}
					</div>
				</div>
			</div>

			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white border-4 border-black py-16 px-8 md:px-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
				<p className="text-2xl font-bold mb-8">
					{t('about.products.centerCard.title')}
				</p>

				<div className="flex flex-col gap-4 px-[2vw] md:px-[3vw] lg:px-[8vw]">
					<BrutalButton
						onClick={handleContactClick}
						text={t('about.products.centerCard.contact')}
						emoji="📦"
						isOpen={isOpen}
						className="w-full text-xl bg-[#ED1C24]"
					/>

					<Link
						to="/collections/all"
						className="w-full px-6 py-3 text-xl font-semibold border-2 border-black 
              bg-transparent text-black
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
              hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
              active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              active:translate-x-[2px] active:translate-y-[2px]
              transition-all duration-200"
					>
						{t('about.products.centerCard.allProducts')}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductScroller;