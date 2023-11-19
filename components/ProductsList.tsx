"use client";
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
import { useToast } from "./ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { useState } from "react";
import { deleteProduct } from "@/actions/product";

interface ProductsListProps {
  products: Partial<Product>[];
}

function downloadSVG(svgData: string, fileName: string) {
  // Create an SVG element
  const svgElement = document.createElement("svg");
  svgElement.innerHTML = svgData;

  // Serialize the SVG element to XML
  const svgXml = new XMLSerializer().serializeToString(svgElement);

  // Create a data URI for the SVG
  const svgDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgXml,
  )}`;

  // Create a download link
  const a = document.createElement("a");
  a.href = svgDataUri;
  a.download = fileName;
  a.textContent = "Download SVG";

  // Trigger a click event on the download link to start the download
  a.dispatchEvent(new MouseEvent("click"));
}

function downloadBase64Image(base64Data: string, fileName: string) {
  // Create a data URI for the base64 image
  const dataUri = !base64Data.startsWith("data:image")
    ? `data:image/png;base64,${base64Data}`
    : base64Data; // You may need to specify the appropriate image format

  // Create a download link
  const a = document.createElement("a");
  a.href = dataUri;
  a.download = fileName;
  a.textContent = "Download Image";

  // Trigger a click event on the download link to start the download
  a.dispatchEvent(new MouseEvent("click"));
}

function ProductsList({ products }: ProductsListProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  async function getQrCode(productId: string) {
    try {
      const res = await fetch(`/api/qrcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
        }),
      });
      const resBody = await res.json();
      // console.log(resBody);
      downloadSVG(resBody.svg, "qrcode.svg");
      downloadBase64Image(resBody.png, "qrcode.png");
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please refresh and try again.",
      });
    }
  }

  async function deleteProductHandler() {
    if (!productToDelete) return;
    try {
      setIsDeleting(true);
      await deleteProduct(productToDelete);
      setIsDeleting(false);
      setProductToDelete(null);
      setIsDialogOpen(false);
    } catch (e) {
      setIsDeleting(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete product, please try again",
      });
    }
  }

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
                    <Button
                      onClick={() => getQrCode(product.id || "")}
                      size="sm"
                      variant="ghost"
                    >
                      <QrCode size={16} />
                    </Button>
                  </TooltipWrapper>
                  <TooltipWrapper message="View Label">
                    <Link href={`/label/${product.id}`}>
                      <Button size="sm" variant="ghost">
                        <Eye size={16} />
                      </Button>
                    </Link>
                  </TooltipWrapper>
                  <TooltipWrapper message="Delete product">
                    <Button
                      onClick={() => {
                        setProductToDelete(product.id || null);
                        setIsDialogOpen(true);
                      }}
                      size="sm"
                      variant="ghost"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TooltipWrapper>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(val) => {
          setIsDialogOpen(val);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm</DialogTitle>
          </DialogHeader>
          <span>Are you sure you want to delete this product?</span>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={deleteProductHandler}
              variant="destructive"
              loading={isDeleting}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductsList;
