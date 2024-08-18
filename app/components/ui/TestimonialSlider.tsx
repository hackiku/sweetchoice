// app/components/ui/TestimonialSlider.tsx

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Testimonial {
	text: string;
	name: string;
	position: string;
	company: string;
	logoSrc: string;
}

const testimonials: Testimonial[] = [
	{
		text: "Sweetchoice has been an invaluable partner for our holiday campaigns. Their products consistently delight our customers.",
		name: "John Doe",
		position: "Sales Director",
		company: "Maxi",
		logoSrc: "/assets/logos/maxi-logo.svg"
	},
	{
		text: "The quality and variety of Sweetchoice's confectionery have significantly boosted our seasonal sales.",
		name: "Jane Smith",
		position: "Procurement Manager",
		company: "Idea",
		logoSrc: "/assets/logos/idea-logo.svg"
	},
	{
		text: "Working with Sweetchoice has made our holiday promotions a breeze. Their reliability is unmatched.",
		name: "Alex Johnson",
		position: "Marketing Lead",
		company: "Univerexport",
		logoSrc: "/assets/logos/univerexport-logo.svg"
	}
];

const TestimonialSlider: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (sliderRef.current) {
			gsap.to(sliderRef.current, {
				x: `-${currentSlide * 85}%`,
				duration: 0.5,
				ease: "power2.out"
			});
		}
	}, [currentSlide]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % testimonials.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	return (
		<div className="w-full relative overflow-hidden bg-[#90EE90] py-12 px-4 sm:px-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-[400px]"
			style={{
				backgroundImage: 'radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, transparent 1px)',
				backgroundSize: '20px 20px',
				backgroundPosition: '0 0, 10px 10px'
			}}>
			<div ref={sliderRef} className="flex transition-transform duration-500 ease-out absolute top-1/2 -translate-y-1/2 left-0">
				{testimonials.map((testimonial, index) => (
					<div key={index} className="w-[85%] sm:w-[60%] flex-shrink-0 bg-white border-4 border-black p-6 mr-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1">
						<p className="text-xl font-semibold mb-4">"{testimonial.text}"</p>
						<div className="flex items-center">
							<div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
							<div>
								<p className="font-bold">{testimonial.name}</p>
								<p>{testimonial.position}</p>
								<img src={testimonial.logoSrc} alt={testimonial.company} className="h-8 mt-2" />
							</div>
						</div>
					</div>
				))}
			</div>
			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-[#FFA6F6] rounded-full flex items-center justify-center text-3xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200"
			>
				←
			</button>
			<button
				onClick={nextSlide}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-[#A6FAFF] rounded-full flex items-center justify-center text-3xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200"
			>
				→
			</button>
		</div>
	);
};

export default TestimonialSlider;