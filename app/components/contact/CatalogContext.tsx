// ~/components/contact/CatalogContext.tsx

const CatalogContext = createContext<CatalogContextType>(null);

export function CatalogProvider({ children }) {
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [isContactOpen, setIsContactOpen] = useState(false);

	return (
		<CatalogContext.Provider value={{
			selectedProducts,
			isContactOpen,
			setIsContactOpen
		}}>
			{children}
			{isContactOpen && <ContactSlideOver />}
		</CatalogContext.Provider>
	);
}