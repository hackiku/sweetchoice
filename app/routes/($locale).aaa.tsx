// app/routes/($locale).aaa.tsx

export async function loader() {
	return {};  // Empty loader to satisfy the layout
}

export default function ProductPics() {
	const TOTAL_IMAGES = 159;  // Update this to your final number

	return (
		<div className="p-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{[...Array(TOTAL_IMAGES)].map((_, i) => (
					<a
						key={i}
						href={`/catalog/product-pics/${i + 1}.png`}
						target="_blank"
						rel="noopener noreferrer"
						className="block"
					>
						<div
							className="bg-white border-4 border-black p-4 
                        shadow-[8px_8px_0px_rgba(0,0,0,1)]
                        hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] 
                        transition-all duration-200 
                        hover:-translate-x-1 hover:-translate-y-1"
						>
							<div className="aspect-square overflow-hidden border-2 border-black">
								<img
									src={`/catalog/product-pics/${i + 1}.png`}
									alt={`Product ${i + 1}`}
									className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
									loading="lazy"
								/>
							</div>
							<div className="mt-2 text-center font-mono">{i + 1}.png</div>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}