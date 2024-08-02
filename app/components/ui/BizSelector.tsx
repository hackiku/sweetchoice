// app/components/ui/BizSelector.tsx

import { useState } from 'react';

export function BizSelector() {
	const [isB2B, setIsB2B] = useState(true);

	const handleToggle = () => {
		setIsB2B((prev) => !prev);
	};

	return (
		<div className="business-selecssstor">
			<span className={isB2B ? 'active' : ''} onClick={handleToggle}>
				Wholesale
			</span>
			<span className={!isB2B ? 'active' : ''} onClick={handleToggle}>
				Retail
			</span>
		</div>
	);
}
