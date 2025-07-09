// app/components/ecom/StoreNav.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Breadcrumb {
	name: string;
	path: string;
}

interface StoreNavProps {
	breadcrumbs?: Breadcrumb[];
}

const StoreNav: React.FC<StoreNavProps> = ({ breadcrumbs }) => {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter((x) => x);

	// Generate breadcrumbs from the URL path if not provided
	const generatedBreadcrumbs = pathnames.map((value, index) => {
		const path = `/${pathnames.slice(0, index + 1).join('/')}`;
		return { name: value.charAt(0).toUpperCase() + value.slice(1), path };
	});

	const crumbs = breadcrumbs || generatedBreadcrumbs;

	return (
		<div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
			<div>
				<nav className="flex" aria-label="Breadcrumb">
					<ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
						<li className="inline-flex items-center">
							<Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
								<svg className="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
									<path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
								</svg>
								Home
							</Link>
						</li>
						{crumbs.map((crumb, index) => (
							<li key={crumb.path} aria-current={index === crumbs.length - 1 ? 'page' : undefined}>
								<div className="flex items-center">
									{index !== 0 && (
										<svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
											<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
										</svg>
									)}
									{index === crumbs.length - 1 ? (
										<span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">{crumb.name}</span>
									) : (
										<Link to={crumb.path} className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">{crumb.name}</Link>
									)}
								</div>
							</li>
						))}
					</ol>
				</nav>
				<h2 className="mt-3 text-4xl font-semibold text-gray-900 dark:text-white sm:text-5xl">{crumbs[crumbs.length - 1]?.name}</h2>
			</div>
		</div>
	);
};

export default StoreNav;
