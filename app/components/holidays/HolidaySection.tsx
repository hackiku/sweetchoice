// app/components/holidays/HolidaySection.tsx

import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import ProductCard from '~/components/ecom/ProductCard';

const holidays = [
	{ id: 'christmas', title: 'Christmas', mainColor: '#F65A4D', secondaryColor: '#00FF00' },
	{ id: 'valentines', title: "Valentine's Day", mainColor: '#D8B3F8', secondaryColor: '#FF6B6B' },
	{ id: 'easter', title: 'Easter', mainColor: '#FFDB58', secondaryColor: '#FF6B6B' },
	{ id: 'halloween', title: 'Halloween', mainColor: '#FFA500', secondaryColor: '#00FF00' },
];

const HolidaySection = ({ holidayCollections }) => {
	const [orderSize, setOrderSize] = useState(50); // Default 50 kg

	return (
		<div className="flex flex-col items-center gap-12 overflow-x-hidden">
			{holidays.map((holiday) => {
				const collection = holidayCollections[holiday.id];
				if (!collection) return null;

				return (
					<section
						id={holiday.id}
						key={holiday.id}
						className="w-[95vw] rounded-[2em] border-4
                     border-black px-6 py-8 md:p-16 relative"
						style={{ backgroundColor: holiday.mainColor }}
					>
						{/* <ParallaxSnow /> */}

						<div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
							<h2 className="text-6xl font-bold mb-1 relative z-10">{holiday.title}</h2>
							<div className="w-full md:w-3/6">
								<p className="text-xl font-semibold mb-4">{collection.description || 'Holiday description placeholder'}</p>
							</div>
						</div>

						<ProductsGrid
							products={collection.products.nodes}
							secondaryColor={holiday.secondaryColor}
						/>
						<div className="mt-8 flex flex-cols justify-center items-center gap-8">
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
							<div className="flex flex-col sm:flex-row gap-4">
								<Link
									to={`/collections/${collection.handle}`}
									className="text-3xl px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
									style={{ backgroundColor: holiday.secondaryColor }}
								>
									{holiday.title} →
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

						{/* secondary button */}
						{/* <Link
              to="/collections/all"
              className="text-3xl px-4 py-2 border-2 border-black
              bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              All Collections →
            </Link> */}
					</section>
				);
			})}
		</div>
	);
};


const ProductsGrid = ({ products, secondaryColor }) => {
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
					<ProductCardComponent key={product.id} product={product} secondaryColor={secondaryColor} />
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
const ProductCardComponent = ({ product, secondaryColor }) => {
	const variantUrl = `/products/${product.handle}`;
	const imageUrl = product.featuredImage?.url || '';
	const imageAlt = product.featuredImage?.altText || product.title;
	const price = <Money data={product.priceRange.minVariantPrice} />;

	return (
		<ProductCard
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

const ParallaxSnow = () => {
	const snowflakes = [
		{ size: 24, top: '10%', left: '5%', delay: 0 },
		{ size: 32, top: '20%', right: '10%', delay: 0.5 },
		{ size: 40, bottom: '15%', left: '15%', delay: 1 },
		{ size: 28, top: '40%', right: '20%', delay: 1.5 },
		{ size: 36, bottom: '30%', right: '25%', delay: 2 },
	];

	return (
		<>
			{snowflakes.map((snowflake, index) => (
				<div
					key={index}
					className="absolute z-0"
					style={{
						top: snowflake.top,
						left: snowflake.left,
						right: snowflake.right,
						bottom: snowflake.bottom,
						animation: `float 20s ease-in-out infinite ${snowflake.delay}s`,
					}}
				>
					<img
						src="/assets/holidays/snow.svg"
						alt="Snowflake"
						width={snowflake.size}
						height={snowflake.size}
					/>
				</div>
			))}
		</>
	);
};

export default HolidaySection;