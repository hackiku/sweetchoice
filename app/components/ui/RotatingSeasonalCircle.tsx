// app/components/ui/RotatingSeasonalCircle.tsx

import React, { useEffect, useRef } from 'react';

const ROTATION_SPEED_DESKTOP = 0.016;
const ROTATION_SPEED_MOBILE = 0.008;

const seasons = [
	{ emoji: '🎅', color: 'rgba(246, 90, 77, 0.4)' }, // Christmas
	{ emoji: '💖', color: 'rgba(216, 179, 248, 0.4)' }, // Valentine's
	{ emoji: '🐰', color: 'rgba(255, 219, 88, 0.4)' }, // Easter
	{ emoji: '🎃', color: 'rgba(255, 165, 0, 0.4)' }, // Halloween
];

const RotatingSeasonalCircle: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const resizeCanvas = () => {
			const parent = canvas.parentElement;
			if (parent) {
				canvas.width = parent.clientWidth;
				canvas.height = parent.clientHeight;
			}
		};

		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		let rotation = 0;

		const drawCircle = (x: number, y: number, radius: number, color: string) => {
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 3;
			ctx.stroke();
		};

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const centerX = canvas.width / 1.3;
			const centerY = canvas.height / 2.2;
			const radius = Math.min(canvas.width, canvas.height) * 0.26;

			seasons.forEach((season, index) => {
				const angle = rotation + (index * Math.PI * 2) / seasons.length;
				const x = centerX + radius * Math.cos(angle);
				const y = centerY + radius * Math.sin(angle);

				drawCircle(x, y, radius * 0.3, season.color);

				ctx.font = `${radius * 0.2}px Arial`;
				ctx.fillStyle = 'black';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(season.emoji, x, y);
			});

			const isMobile = window.innerWidth < 768;
			rotation += isMobile ? ROTATION_SPEED_MOBILE : ROTATION_SPEED_DESKTOP;
			requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	}, []);

	return (
		<div className="w-full h-full">
			<canvas ref={canvasRef} className="w-full h-full" />
		</div>
	);
};

export default RotatingSeasonalCircle;