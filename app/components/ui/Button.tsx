// app/components/ui/Button.tsx

import React from 'react';

interface ButtonProps {
	type: 'primary' | 'secondary';
	children: React.ReactNode;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => {
	return (
		<button className={`button ${type}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
