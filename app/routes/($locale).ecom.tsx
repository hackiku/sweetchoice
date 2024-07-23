// app/routes/($locale).ecom.tsx

import { Button, Footer, Tooltip } from "flowbite-react";


export default function Ecom() {
	return (
		<div>
			<h2 className="text-5xl pt-12">Ecom Flowbite</h2>
			<Tooltip content="Flowbite is awesome">
				<Button color={"light"}>
					Hover to find out
				</Button>
			</Tooltip>
			
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
