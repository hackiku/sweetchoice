// app/components/holidays/HolidaySection.tsx

import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import WholesaleCard from '~/components/ecom/WholesaleCard';

const holidays = [
	{ id: 'christmas', title: 'Christmas', mainColor: '#F65A4D', secondaryColor: '#00FF00' },
	{ id: 'valentines', title: "Valentine's Day", mainColor: '#D8B3F8', secondaryColor: '#FF6B6B' },
	{ id: 'easter', title: 'Easter', mainColor: '#FFDB58', secondaryColor: '#FF6B6B' },
	{ id: 'halloween', title: 'Halloween', mainColor: '#FFA500', secondaryColor: '#00FF00' },
];

const HolidaySection = ({ holidayCollections }) => {
	const [orderSize, setOrderSize] = useState(50); // Default 50 kg

	return (
		<div className="flex flex-col items-center gap-8 overflow-x-hidden">
			{holidays.map((holiday) => {
				const collection = holidayCollections[holiday.id];
				if (!collection) return null;

				return (
					<section
						id={holiday.id}
						key={holiday.id}
						className="w-[92vw] rounded-[2em] border-4 border-black px-8 py-12 md:p-16 relative"
						style={{ backgroundColor: holiday.mainColor }}
					>
						{/* <ParallaxSnow /> */}

						<div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
							<h2 className="text-6xl font-bold mb-1 relative z-10">{holiday.title}</h2>
							<div className="w-full md:w-3/6">
								<p className="text-xl font-semibold mb-4">{collection.description || 'Holiday description placeholder'}</p>
							</div>
						</div>

						<WholesaleGrid
							products={collection.products.nodes}
							secondaryColor={holiday.secondaryColor}
						/>
						
						<div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-8">
							<div className="w-full max-w-md">
								<label htmlFor="orderSize" className="block text-lg font-semibold mb-2">Typical Order Size: {orderSize} kg</label>
								<input
									type="range"
									id="orderSize"
									min="10"
									max="1000"
									step="10"
									value={orderSize}
									onChange={(e) => setOrderSize(Number(e.target.value))}
									className="w-full h-8 appearance-none bg-white border-4 border-black rounded-full outline-none"
								/>
								<div className="flex justify-between text-sm mt-1">
									<span>10 kg</span>
									<span>1000 kg</span>
								</div>
							</div>
							<div className="flex gap-6">
								<Link
									to={`/contact`}
									className="text-xl px-6 py-2 border-2 border-black
  									shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
										transition-all duration-200
										flex items-center justify-center"
									style={{ backgroundColor: holiday.secondaryColor }}
								>
									Get a Quote →
								</Link>

								<Link
									to={`#`}
									className={`flex justify-center items-center rounded-full 
                              border-4 border-black transition-all duration-300 
                              hover:scale-110
                              w-[64px] h-[64px] text-2xl bg-black text-white shadow-[4px_4px_0px_0px_#FFFFFF]`}
								>
									Hey
								</Link>
							</div>
						</div>
					</section>
				);
			})}
		</div>
	);
};

const WholesaleGrid = ({ products, secondaryColor }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [productsPerPage, setProductsPerPage] = useState(4);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1280) setProductsPerPage(8);
			else if (window.innerWidth >= 768) setProductsPerPage(6);
			else setProductsPerPage(4);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const totalPages = Math.ceil(products.length / productsPerPage);

	const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
	const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

	const currentProducts = products.slice(
		currentPage * productsPerPage,
		(currentPage + 1) * productsPerPage
	);

	return (
		<div className="relative">
			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4">
				{currentProducts.map((product) => (
					<WholesaleCardComponent key={product.id} product={product} secondaryColor={secondaryColor} />
				))}
			</div>

			<button
				onClick={prevPage}
				className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-24 h-24 rounded-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-4xl hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
			>
				←
			</button>
			<button
				onClick={nextPage}
				className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-24 h-24 rounded-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-4xl hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
			>
				→
			</button>

			<div className="absolute -bottom-8 right-0 flex gap-2">
				{[...Array(totalPages)].map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentPage(index)}
						className={`w-4 h-4 rounded-full border-2 border-black ${index === currentPage ? 'bg-black' : 'bg-white'
							}`}
					/>
				))}
			</div>
		</div>
	);
};

const WholesaleCardComponent = ({ product, secondaryColor }) => {
	const variantUrl = `/products/${product.handle}`;
	const imageUrl = product.featuredImage?.url || '';
	const imageAlt = product.featuredImage?.altText || product.title;
	const price = <Money data={product.priceRange.minVariantPrice} />;

	return (
		<WholesaleCard
			productName={product.title}
			productLink={variantUrl}
			imageUrl={imageUrl}
			imageAlt={imageAlt}
			price={price}
			weight="80g"
			buttonBgColor={secondaryColor}
		/>
	);
};

export default HolidaySection;