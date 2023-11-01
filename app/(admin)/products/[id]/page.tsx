import ProductForm from "@/components/ProductForm";
import React from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  let product = {};
  if (id !== "new") {
    //get product data
  }

  return (
    <div>
      <ProductForm isNew={id === "new"} product={product} />
    </div>
  );
}

export default ProductPage;
