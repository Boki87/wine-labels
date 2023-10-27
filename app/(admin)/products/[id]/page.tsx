import React from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  return <div>ProductPage {id}</div>;
}

export default ProductPage;
