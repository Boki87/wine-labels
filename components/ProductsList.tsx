import { Product } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "./ui/button";
import { Eye, Pencil, Plus, QrCode, Trash2 } from "lucide-react";
import TooltipWrapper from "./TooltipWrapper";

interface ProductsListProps {
  products: Partial<Product>[];
}

function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between mb-4 mt-6">
        <span className="font-bold text-2xl">Product List</span>
        <Link href={`/products/new`}>
          <Button>
            <Plus />
            <span>Add new product</span>
          </Button>
        </Link>
      </div>

      <div>
        <Table className="border border-gray-100">
          <TableCaption>List of all your products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] font-bold">#</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type of wine</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell className="font-bold">{index + 1}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.typeOfWine}</TableCell>
                <TableCell>{product.year}</TableCell>
                <TableCell className="flex justify-end gap-1">
                  <TooltipWrapper message="Edit product">
                    <Link href={`/products/${product.id}`}>
                      <Button size="sm" variant="ghost">
                        <Pencil size={16} />
                      </Button>
                    </Link>
                  </TooltipWrapper>
                  <TooltipWrapper message="Download QRCode">
                    <Button size="sm" variant="ghost">
                      <QrCode size={16} />
                    </Button>
                  </TooltipWrapper>
                  <TooltipWrapper message="View Label">
                    <Button size="sm" variant="ghost">
                      <Eye size={16} />
                    </Button>
                  </TooltipWrapper>
                  <TooltipWrapper message="Delete product">
                    <Button size="sm" variant="ghost">
                      <Trash2 size={16} />
                    </Button>
                  </TooltipWrapper>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ProductsList;
