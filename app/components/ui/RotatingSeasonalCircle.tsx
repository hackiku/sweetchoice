// app/components/ui/RotatingSeasonalCircle.tsx

import React, { useEffect, useRef } from 'react';

const ROTATION_SPEED = 0.016;

const seasons = [
	{ emoji: '🎅', color: '#F65A4D' }, // Christmas
	{ emoji: '💖', color: '#D8B3F8' }, // Valentine's
	{ emoji: '🐰', color: '#FFDB58' }, // Easter
	{ emoji: '🎃', color: '#FFA500' }, // Halloween
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

		const drawStar = (x: number, y: number, radius: number, color: string) => {
			ctx.beginPath();
			for (let i = 0; i < 5; i++) {
				const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
				const px = x + radius * Math.cos(angle);
				const py = y + radius * Math.sin(angle);
				ctx.lineTo(px, py);
			}
			ctx.closePath();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 3;
			ctx.stroke();
		};

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const centerX = canvas.width / 1.4;
			const centerY = canvas.height / 3;
			const radius = Math.min(canvas.width, canvas.height) * 0.3;

			seasons.forEach((season, index) => {
				const angle = rotation + (index * Math.PI * 2) / seasons.length;
				const x = centerX + radius * Math.cos(angle);
				const y = centerY + radius * Math.sin(angle);

				drawStar(x, y, radius * 0.3, season.color);

				ctx.font = `${radius * 0.2}px Arial`;
				ctx.fillStyle = 'black';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(season.emoji, x, y);
			});

			rotation += ROTATION_SPEED;
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