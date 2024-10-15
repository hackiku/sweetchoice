// components/ui/Tooltip.tsx

import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
	content: string;
	children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
	const [isVisible, setIsVisible] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const childRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseEnter = () => setIsVisible(true);
		const handleMouseLeave = () => setIsVisible(false);

		const childElement = childRef.current;
		if (childElement) {
			childElement.addEventListener('mouseenter', handleMouseEnter);
			childElement.addEventListener('mouseleave', handleMouseLeave);
		}

		return () => {
			if (childElement) {
				childElement.removeEventListener('mouseenter', handleMouseEnter);
				childElement.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	}, []);

	useEffect(() => {
		if (isVisible && tooltipRef.current && childRef.current) {
			const childRect = childRef.current.getBoundingClientRect();
			const tooltipRect = tooltipRef.current.getBoundingClientRect();

			tooltipRef.current.style.left = `${childRect.left + (childRect.width / 2) - (tooltipRect.width / 2)}px`;
			tooltipRef.current.style.top = `${childRect.top - tooltipRect.height - 10}px`;
		}
	}, [isVisible]);

	return (
		<>
			<div ref={childRef} className="inline-block">
				{children}
			</div>
			{isVisible && (
				<div
					ref={tooltipRef}
					className="fixed z-50 px-3 py-2 text-sm font-bold text-white bg-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
					style={{ transform: 'translateX(-50%)' }}
				>
					{content}
					<div className="absolute w-3 h-3 bg-black border-r-2 border-b-2 border-white rotate-45 left-1/2 -bottom-[7px] -translate-x-1/2"></div>
				</div>
			)}
		</>
	);
};