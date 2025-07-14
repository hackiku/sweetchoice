// app/components/ui/Breadcrumbs.tsx

import { Link, useMatches } from '@remix-run/react';

interface BreadcrumbsProps {
	separator?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ separator = " / " }) => {
	const matches = useMatches();

	const crumbs = matches
		.filter((match) => match.handle && match.handle.breadcrumb)
		.map((match) => (
			<Link key={match.pathname} to={match.pathname} className="breadcrumb-link">
				{typeof match.handle.breadcrumb === 'function' ? match.handle.breadcrumb({ params: match.params }) : match.handle.breadcrumb}
			</Link>
		));

	return (
		<nav aria-label="breadcrumb" className="breadcrumbs">
			{crumbs.map((crumb, index) => (
				<span key={index} className="breadcrumb-item">
					{crumb}
					{index < crumbs.length - 1 && <span className="breadcrumb-separator">{separator}</span>}
				</span>
			))}
		</nav>
	);
};

export default Breadcrumbs;
