import { getProduct } from "@/actions/product";
import ProductForm from "@/components/ProductForm";
import { productSchemaType } from "@/schemas/product";
import React from "react";

interface ProductPageProps {
	params: {
		id: string;
	};
}

async function ProductPage({ params }: ProductPageProps) {
	const { id } = params;
	let product: (productSchemaType & { id?: string }) | null = null;
	if (id !== "new") {
		//get product data
		//@ts-ignore
		product = await getProduct(id);
	}

	return (
		<div>
			<ProductForm isNew={id === "new"} product={product} />
		</div>
	);
}

export default ProductPage;
