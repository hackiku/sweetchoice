// app/components/BusinessSelector.tsx

import { useState } from 'react';

export function BusinessSelector() {
	const [isB2B, setIsB2B] = useState(true);

	const handleToggle = () => {
		setIsB2B((prev) => !prev);
	};

	return (
		<div className="business-selector">
			<span className={isB2B ? 'active' : ''} onClick={handleToggle}>
				B2B
			</span>
			<span className={!isB2B ? 'active' : ''} onClick={handleToggle}>
				B2C
			</span>
		</div>
	);
}
