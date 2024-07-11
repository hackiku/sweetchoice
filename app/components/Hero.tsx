// app/components/Hero.tsx

export function Hero({ title, paragraph, buttonLabel, backgroundImage, slotContent }) {
	return (
		<section
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '2rem',
				background: backgroundImage ? `url(${backgroundImage}) no-repeat center/cover` : 'var(--color-light)',
			}}
		>
			<div>
				<h1>{title}</h1>
				<p>{paragraph}</p>
				<button
					style={{
						backgroundColor: 'var(--color-brand)',
						border: 'none',
						padding: '1em 2em',
						margin: '1em 0 4em 0',
						color: 'white',
						fontSize: '1em',
						cursor: 'pointer',
						borderRadius: '5px',
					}}
				>
					{buttonLabel}
				</button>
			</div>
			<div>{slotContent}</div>
		</section>
	);
}
