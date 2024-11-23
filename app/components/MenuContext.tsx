import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation } from '@remix-run/react';
import MobileMenu from './MobileMenu';

interface MenuContextType {
	isOpen: boolean;
	openMenu: () => void;
	closeMenu: () => void;
	setIsScrolled: (scrolled: boolean) => void;
	isScrolled: boolean;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const headerHeight = 100;
			setIsScrolled(scrollPosition > headerHeight);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close menu on route change
	useEffect(() => {
		if (isOpen) {
			setIsOpen(false);
		}
	}, [location]);

	const openMenu = useCallback(() => {
		setIsOpen(true);
		// Prevent body scroll when menu is open
		document.body.style.overflow = 'hidden';
	}, []);

	const closeMenu = useCallback(() => {
		setIsOpen(false);
		// Restore body scroll
		document.body.style.overflow = '';
	}, []);

	const contextValue = {
		isOpen,
		openMenu,
		closeMenu,
		isScrolled,
		setIsScrolled
	};

	return (
		<MenuContext.Provider value={contextValue}>
			{children}
			<MobileMenu isOpen={isOpen} onClose={closeMenu} />
		</MenuContext.Provider>
	);
}

export function useMenu() {
	const context = useContext(MenuContext);
	if (context === undefined) {
		throw new Error('useMenu must be used within a MenuProvider');
	}
	return context;
}