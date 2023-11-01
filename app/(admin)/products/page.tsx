import ProductsList from "@/components/ProductsList";

const products = [
  {
    id: "1",
    profileId: "1",
    brand: "IB d.o.o",
    name: "silvanac",
    typeOfWine: "White",
    year: "2023",
  },
  {
    id: "2",
    profileId: "1",
    brand: "IB d.o.o",
    name: "muskat",
    typeOfWine: "White",
    year: "2023",
  },
  {
    id: "3",
    profileId: "1",
    brand: "IB d.o.o",
    name: "vranac",
    typeOfWine: "White",
    year: "2023",
  },
];

function ProductsPage() {
  return <ProductsList products={products} />;
}

export default ProductsPage;
