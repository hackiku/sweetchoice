// app/components/ui/Eyebrow.tsx

import '../../styles/components/ui.css';

interface EyebrowProps {
	title: string;
}

const Eyebrow: React.FC<EyebrowProps> = ({ title }) => {
	return (
		<div className="eyebrow">
			<span className="eyebrow-title">{title}</span>
		</div>
	);
};

export default Eyebrow;
