"use client";
import { Product, Profile } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { createProduct, updateProduct } from "@/actions/product";
import {
  ProductMapType,
  fieldsMap,
  productSchema,
  productSchemaType,
} from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Save } from "lucide-react";
import ProductFormSection from "./productForm/ProductFormSection";
import ProductVideo from "./productForm/ProductVideo";

interface ProductFormProps {
  product: (productSchemaType & { id?: string }) | null;
  isNew?: boolean;
}

function ProductForm({ product, isNew = false }: ProductFormProps) {
  let defaultValues = {};
  if (product !== null) {
    defaultValues = product;
  }
  const form = useForm<productSchemaType>({
    defaultValues,
    resolver: zodResolver(productSchema),
  });

  async function onSubmit(values: productSchemaType) {
    try {
      if (isNew) {
        const newProduct = await createProduct(values);
        console.log("created", newProduct);
      } else {
        const updatedProduct = await updateProduct(product?.id || "", values);
        console.log("updated", updatedProduct);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ProductFormSection
            fieldsMap={fieldsMap.productInformation}
            title="Product Information"
            form={form}
          />
          <div className="mb-8">
            <ProductVideo form={form} />
          </div>
          <ProductFormSection
            fieldsMap={fieldsMap.wineDetails}
            title="Wine details"
            form={form}
          />
        </form>
      </Form>
      <Button
        className="min-w-[120px] gap-2"
        onClick={form.handleSubmit(onSubmit)}
        disabled={form.formState.isSubmitting}
        loading={form.formState.isSubmitting}
      >
        <Save />
        <span>{isNew ? "Create product" : "Save changes"}</span>
      </Button>
    </div>
  );
}

export default ProductForm;
