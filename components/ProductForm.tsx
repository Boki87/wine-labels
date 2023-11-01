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
import { Input } from "./ui/input";
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
import ReactSelect from "./ui/reactSelect";
import ProductFormSection from "./productForm/ProductFormSection";
import ProductVideo from "./productForm/ProductVideo";

interface ProductFormProps {
  product: Partial<Product>;
  isNew?: boolean;
}

function ProductForm({ product, isNew = false }: ProductFormProps) {
  const form = useForm<productSchemaType>({
    defaultValues: product,
    resolver: zodResolver(productSchema),
  });

  async function onSubmit(values: productSchemaType) {
    console.log(values);
    return;
    try {
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
