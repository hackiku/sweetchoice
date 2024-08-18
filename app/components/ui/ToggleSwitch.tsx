// app/components/ui/ToggleSwitch.tsx

import React from 'react';

interface ToggleSwitchProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
	return (
		<label className="relative inline-flex items-center cursor-pointer">
			<input
				type="checkbox"
				value=""
				className="sr-only peer"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
			/>
			<div className="w-11 h-6 bg-gray-400 rounded-full border-2 border-black peer-checked:bg-pink-300 peer-checked:shadow-[2px_2px_0px_rgba(0,0,0,1)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:border-2 after:border-black after:transition-all peer-checked:after:translate-x-full">
			</div>
		</label>
	);
};

export default ToggleSwitch;