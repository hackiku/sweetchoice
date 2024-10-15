// components/ui/Tooltip.tsx

import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
	content: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, style }) => {
	const [isVisible, setIsVisible] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const childRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const showTooltip = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setIsVisible(true);
	};

	const hideTooltip = () => {
		timeoutRef.current = setTimeout(() => {
			setIsVisible(false);
		}, 300);
	};

	useEffect(() => {
		const childElement = childRef.current;
		if (childElement) {
			childElement.addEventListener('mouseenter', showTooltip);
			childElement.addEventListener('mouseleave', hideTooltip);
			childElement.addEventListener('touchstart', showTooltip);
			childElement.addEventListener('touchend', hideTooltip);
		}

		return () => {
			if (childElement) {
				childElement.removeEventListener('mouseenter', showTooltip);
				childElement.removeEventListener('mouseleave', hideTooltip);
				childElement.removeEventListener('touchstart', showTooltip);
				childElement.removeEventListener('touchend', hideTooltip);
			}
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	useEffect(() => {
		if (isVisible && tooltipRef.current && childRef.current) {
			const childRect = childRef.current.getBoundingClientRect();
			const tooltipRect = tooltipRef.current.getBoundingClientRect();

			tooltipRef.current.style.left = `${childRect.left + (childRect.width / 2)}px`;
			tooltipRef.current.style.top = `${childRect.top - tooltipRect.height - 10}px`;
		}
	}, [isVisible]);

	return (
		<>
			<div ref={childRef} className="inline-block">
				{children}
			</div>
			{isVisible && content && (
				<div
					ref={tooltipRef}
					className="fixed z-50 px-3 py-2 text-sm font-bold text-white bg-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
					style={{ ...style, transform: 'translateX(-50%)' }}
				>
					{content}
					<div className="absolute w-3 h-3 bg-black border-r-2 border-b-2 border-white rotate-45 left-1/2 -bottom-[7px] -translate-x-1/2"></div>
				</div>
			)}
		</>
	);
};