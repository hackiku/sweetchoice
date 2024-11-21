// app/components/ecom/product/ProductGallery.tsx

import { useState } from 'react';
import { Image } from '@shopify/hydrogen';

interface ProductImage {
	id: string;
	url: string;
	altText?: string;
	width?: number;
	height?: number;
}

interface ProductGalleryProps {
	images: ProductImage[];
	title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
	const [selectedImage, setSelectedImage] = useState(0);

	if (!images?.length) {
		return (
			<div className="product-image border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                    bg-[#FFF9E5] aspect-square flex items-center justify-center">
				<span className="text-2xl font-bold">No Image Available</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Main Product Image */}
			<div className="product-image border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                    bg-[#FFF9E5] aspect-square overflow-hidden">
				<Image
					data={images[selectedImage]}
					alt={images[selectedImage]?.altText || title}
					sizes="(min-width: 45em) 50vw, 100vw"
					className="w-full h-full object-contain p-4 transition-transform duration-300"
				/>
			</div>

			{/* Image Thumbnails */}
			{images.length > 1 && (
				<div className="flex gap-2 overflow-x-auto pb-2">
					{images.map((image, index) => (
						<button
							key={image.id}
							onClick={() => setSelectedImage(index)}
							className={`flex-none w-20 h-20 border-2 border-black overflow-hidden
                         transition-all duration-200
                         ${selectedImage === index
									? 'ring-2 ring-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
									: 'opacity-70 hover:opacity-100'}`}
						>
							<Image
								data={image}
								alt={`View ${index + 1} of ${images.length}`}
								className="w-full h-full object-cover"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
}