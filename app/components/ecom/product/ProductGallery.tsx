// app/components/ecom/product/ProductGallery.tsx

import { useState } from 'react';
import { Image } from '@shopify/hydrogen';
import { useTranslation } from '~/lib/i18n/useTranslation';

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
	const { t } = useTranslation();
	const [selectedImage, setSelectedImage] = useState(0);

	if (!images?.length) {
		return (
			<div className="product-image border-4 border-black rounded-xl shadow-[8px_8px_0px_rgba(0,0,0,1)] 
                    bg-gradient-to-br from-[#FFF9E5] to-[#FFE4E1] min-h-[400px] flex items-center justify-center">
				<span className="text-2xl font-bold text-gray-600">{t('product.gallery.noImage')}</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Main Product Image - Enhanced & Adaptive */}
			<div className="product-image border-4 border-black rounded-xl shadow-[8px_8px_0px_rgba(0,0,0,1)] 
                    bg-gradient-to-br from-[#FFF9E5] via-white to-[#FFE4E1] overflow-hidden
                    hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300
                    group cursor-zoom-in relative">
				<Image
					data={images[selectedImage]}
					alt={images[selectedImage]?.altText || title}
					sizes="(min-width: 45em) 50vw, 100vw"
					className="w-full h-auto object-contain p-6 transition-transform duration-500
                       group-hover:scale-105 min-h-[400px] max-h-[600px]"
				/>

				{/* Image counter overlay */}
				{images.length > 1 && (
					<div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full
                            text-sm font-bold border-2 border-white shadow-lg">
						{t('product.gallery.imageCounter')
							.replace('{{current}}', String(selectedImage + 1))
							.replace('{{total}}', String(images.length))}
					</div>
				)}
			</div>

			{/* Image Thumbnails - Enhanced with Oblique Stripes */}
			{images.length > 1 && (
				<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
					{images.map((image, index) => (
						<div key={image.id} className="relative">
							<button
								onClick={() => setSelectedImage(index)}
								className={`flex-none w-20 h-20 border-4 border-black rounded-lg overflow-hidden
                             transition-all duration-200 hover:scale-105
                             ${selectedImage === index
										? 'ring-2 ring-black shadow-[4px_4px_0px_rgba(0,0,0,1)] scale-105'
										: 'opacity-70 hover:opacity-100 shadow-[2px_2px_0px_rgba(0,0,0,1)]'}`}
							>
								<Image
									data={image}
									alt={t('product.gallery.viewImage')
										.replace('{{index}}', String(index + 1))
										.replace('{{total}}', String(images.length))}
									className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
								/>
							</button>

							{/* Oblique red stripes background for selected thumbnail */}
							{selectedImage === index && (
								<div
									className="absolute -z-10 top-2 left-2 w-full h-full rounded-lg"
									style={{
										background: 'repeating-linear-gradient(45deg, #FF6B6B, #FF6B6B 6px, #FF8787 6px, #FF8787 12px)',
									}}
								></div>
							)}
						</div>
					))}
				</div>
			)}

			{/* Gallery Navigation Dots (for mobile touch friendly) */}
			{images.length > 1 && (
				<div className="flex justify-center gap-2 mt-2 md:hidden">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => setSelectedImage(index)}
							className={`w-3 h-3 rounded-full border-2 border-black transition-all duration-200
                         ${selectedImage === index
									? 'bg-[#FF6B6B] scale-125 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
									: 'bg-white hover:bg-gray-200'}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}