import { getProducts } from "@/actions/product";
import ProductsList from "@/components/ProductsList";
import ClientOnly from "@/components/ClientOnly";

async function ProductsPage() {
	const products = await getProducts();

	return (
		<ClientOnly>
			<ProductsList products={products} />
		</ClientOnly>
	);
}

export default ProductsPage;
