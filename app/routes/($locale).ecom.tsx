// app/routes/($locale).ecom.tsx

import { Button, Footer, Tooltip } from "flowbite-react";
import ShoppingCartDefault from "../components/ecom/ShoppingCartDefault";
import Breadcrumb from "../components/ecom/Breadcrumb";
import CardWithLink from "../components/ecom/CardWithLink";
import ProductCardB2B from "~/components/ecom/ProductCardB2B";



function ProductsGrid({ products }: { products: ProductItemFragment[] }) {
	return (
		<div className="holiday-products-grid">
			{products.map((product, index) => (
				<ProductCardB2B
					key={product.id}
					productName={product.title}
					productLink={`/products/${product.handle}`}
					imageUrl={product.featuredImage?.url || ''}
					imageAlt={product.featuredImage?.altText || product.title}
					price={`$${product.priceRange.minVariantPrice.amount}`}
					features={["Fast Delivery", "Best Price"]}
					darkImageUrl={product.featuredImage?.url || ''} // Assuming the same image for dark mode
				/>
			))}
		</div>
	);
}


export default function Ecom() {
	return (
		<div>
			<Breadcrumb />
			<h2 className="text-5xl pt-12">Ecom Flowbite</h2>
			<Tooltip content="Flowbite is awesome">
				<Button
					color={"light"}
					size={"xl"}
				>
					Hover to find out
				</Button>
			</Tooltip>
			
			<CardWithLink />

			{/* ---------------------------------------- */}
			<ShoppingCartDefault />


			{/* ---------------------------------------- */}


			{/* <ProductCardB2B /> */}

			{/* FOOTER */}
		<section className="fixed left-0 bottom-0 w-screen bg-gray-100">
			<Footer container>
				<Footer.Copyright href="#" by="Flowbite™" year={2022} />
				<Footer.LinkGroup>
					<Footer.Link href="#">About</Footer.Link>
					<Footer.Link href="#">Privacy Policy</Footer.Link>
					<Footer.Link href="#">Licensing</Footer.Link>
					<Footer.Link href="#">Contact</Footer.Link>
				</Footer.LinkGroup>
			</Footer>
		</section>

		</div>

	);
}
