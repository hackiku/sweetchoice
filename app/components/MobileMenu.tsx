// app/components/MobileMenu.tsx

function MobileMenu({ header }) {
	const { close } = useAside();
	return (
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto">
			<div className="flex justify-end p-4">
				<button
					onClick={() => close()}
					className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
				>
					<XMarkIcon className="w-6 h-6 text-gray-700" />
				</button>
			</div>
			<nav className="px-4 py-2 pl-10">
				<NavLink
					end
					prefetch="intent"
					to="/"
					onClick={() => close()}
					className={({ isActive }) =>
						`block py-2 text-[#ED1C24] hover:text-black transition-colors duration-200
             ${isActive ? 'font-bold' : ''}`
					}
				>
					Home
				</NavLink>

				<div className="py-2">
					<h3 className="font-bold text-[#ED1C24]">Holidays</h3>
					<NavLink to="/collections/christmas" onClick={() => close()} className="block py-1 pl-4 text-[#ED1C24] hover:text-black transition-colors duration-200">Christmas</NavLink>
					<NavLink to="/collections/valentines" onClick={() => close()} className="block py-1 pl-4 text-[#ED1C24] hover:text-black transition-colors duration-200">Valentine's Day</NavLink>
					<NavLink to="/collections/easter" onClick={() => close()} className="block py-1 pl-4 text-[#ED1C24] hover:text-black transition-colors duration-200">Easter</NavLink>
					<NavLink to="/collections/halloween" onClick={() => close()} className="block py-1 pl-4 text-[#ED1C24] hover:text-black transition-colors duration-200">Halloween</NavLink>
				</div>
				<NavLink
					to="/all-year"
					onClick={() => close()}
					className={({ isActive }) =>
						`block py-2 text-[#ED1C24] hover:text-black transition-colors duration-200
             ${isActive ? 'font-bold' : ''}`
					}
				>
					All Year
				</NavLink>
				<NavLink
					to="/about"
					onClick={() => close()}
					className={({ isActive }) =>
						`block py-2 text-[#ED1C24] hover:text-black transition-colors duration-200
             ${isActive ? 'font-bold' : ''}`
					}
				>
					About
				</NavLink>
			</nav>
		</div>
	);
}