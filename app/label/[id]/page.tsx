import { getProduct } from "@/actions/product";
import React from "react";

interface LabelPageProps {
  params: {
    id: string;
  };
}

async function LabelPage({ params }: LabelPageProps) {
  const { id } = params;
  const product = await getProduct(id);
  return (
    <div>
      LabelPage {id} {JSON.stringify(product)}
    </div>
  );
}

export default LabelPage;
