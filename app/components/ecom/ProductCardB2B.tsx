// app/components/ecom/ProductCardB2B.tsx

import React, { useState } from 'react';

interface ProductCardB2BProps {
	productName: string;
	productLink: string;
	imageUrl: string;
	imageAlt: string;
	price: string;
	features: string[];
	darkImageUrl: string;
}

const ProductCardB2B: React.FC<ProductCardB2BProps> = ({
	productName,
	productLink,
	imageUrl,
	imageAlt,
	price,
	features,
	darkImageUrl,
}) => {
	const [selectedPackaging, setSelectedPackaging] = useState('single');

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
			<div className="h-56 w-full">
				<a href={productLink}>
					<img className="mx-auto h-full dark:hidden" src={imageUrl} alt={imageAlt} />
					<img className="mx-auto hidden h-full dark:block" src={darkImageUrl} alt={imageAlt} />
				</a>
			</div>
			<div className="pt-6">
				<a href={productLink} className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
					{productName}
				</a>

				<ul className="mt-2 flex items-center gap-4">
					{features.map((feature, index) => (
						<li key={index} className="flex items-center gap-2">
							<svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
							</svg>
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400">{feature}</p>
						</li>
					))}
				</ul>

				<div className="mt-4 flex items-center justify-between gap-4">
					<p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">{price}</p>
				</div>

				<div className="mt-4">
					<label htmlFor="packaging" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Packaging options:</label>
					<select
						id="packaging"
						name="packaging"
						value={selectedPackaging}
						onChange={(e) => setSelectedPackaging(e.target.value)}
						className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					>
						<option value="single">Single</option>
						<option value="bulk">Bulk</option>
						<option value="pallet">Pallet</option>
					</select>
				</div>

				<div className="mt-4 flex items-center justify-between gap-4">
					<button
						type="button"
						className="inline-flex items-center rounded-lg bg-secondary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-secondary-800 focus:outline-none focus:ring-4 focus:ring-secondary-300 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800"
					>
						Add to PDF catalog
					</button>
					<button
						type="button"
						className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						Contact Us
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCardB2B;
