// app/components/ecom/CustomProductCard.tsx

import { Button, Tooltip } from "flowbite-react";

const CustomProductCard = ({ productName, productLink, imageUrl, imageAlt, discountLabel, price, rating, reviewCount }) => {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
			<div className="h-56 w-full">
				<a href={productLink}>
					<img className="mx-auto h-full dark:hidden" src={imageUrl} alt={imageAlt} />
					<img className="mx-auto hidden h-full dark:block" src={imageUrl} alt={imageAlt} />
				</a>
			</div>
			<div className="pt-6">
				<div className="mb-4 flex items-center justify-between gap-4">
					<span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">{discountLabel}</span>

					<div className="flex items-center justify-end gap-1">
						<Tooltip content="Quick look">
							<Button color="light" size="xs">
								<span className="sr-only">Quick look</span>
								<svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
									<path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
									<path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
								</svg>
							</Button>
						</Tooltip>

						<Tooltip content="Add to Favorites">
							<Button color="light" size="xs">
								<span className="sr-only">Add to Favorites</span>
								<svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
								</svg>
							</Button>
						</Tooltip>
					</div>
				</div>

				<a href={productLink} className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{productName}</a>

				<div className="mt-2 flex items-center gap-2">
					{[...Array(5)].map((_, index) => (
						<svg
							key={index}
							className={`h-4 w-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
					))}
					<p className="text-sm font-medium text-gray-900 dark:text-white">{rating.toFixed(1)}</p>
					<p className="text-sm font-medium text-gray-500 dark:text-gray-400">({reviewCount})</p>
				</div>

				<div className="mt-4 flex items-center justify-between gap-4">
					<p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">{price}</p>
					<Button color="cyan" size="sm">
						<svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
						</svg>
						Add to cart
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CustomProductCard;
