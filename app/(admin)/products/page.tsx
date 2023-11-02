import { getProducts } from "@/actions/product";
import ProductsList from "@/components/ProductsList";

async function ProductsPage() {
  const products = await getProducts();

  return <ProductsList products={products} />;
}

export default ProductsPage;
