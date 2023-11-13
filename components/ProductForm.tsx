"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { createProduct, updateProduct } from "@/actions/product";
import { fieldsMap, productSchema, productSchemaType } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Save } from "lucide-react";
import ProductFormSection from "./productForm/ProductFormSection";
import ProductFormToggleSection from "./productForm/ProductFormToggleSection";
import ProductVideo from "./productForm/ProductVideo";
import ReactSelect from "./ui/reactSelect";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ProductImageUpload from "./productForm/ProductImageUpload";
import { destroyImage, uploadImages } from "@/lib/uploadImages";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  product: (productSchemaType & { id?: string }) | null;
  isNew?: boolean;
}

function ProductForm({ product, isNew = false }: ProductFormProps) {
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const [formImages, setFormImages] = useState<string[]>(product?.images || []);
  const [pdo, setPdo] = useState(product?.pdo);
  const [pgi, setPgi] = useState(product?.pgi);
  const { toast } = useToast();
  const router = useRouter();

  let defaultValues = {};
  if (product !== null) {
    defaultValues = product;
  }
  const form = useForm<productSchemaType>({
    defaultValues,
    resolver: zodResolver(productSchema),
  });

  async function updateImagesInDb(productId: string, images: string[]) {
    if (images.length === 0) return;
    const newImages = [...(form.getValues("images") || []), ...images];
    const up = await updateProduct(productId || "", { images: newImages });
    setImagesToUpload([]);
    form.setValue("images", up.images);
  }

  async function onSubmit(values: productSchemaType) {
    try {
      if (isNew) {
        const newProduct = await createProduct(values);
        const res = await uploadImages(imagesToUpload, newProduct.userId);
        updateImagesInDb(newProduct.id, res);
        toast({
          title: "Success",
          description: "You have successfully created your product",
        });
        router.replace("/products");
        // console.log("created", newProduct);
      } else {
        const updatedProduct = await updateProduct(product?.id || "", values);
        const res = await uploadImages(imagesToUpload, updatedProduct.userId);
        updateImagesInDb(updatedProduct.id, res);
        // console.log("updated", updatedProduct);
        toast({
          title: "Success",
          description: "You have successfully updated your product",
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  }

  function updateImagesToUpload(newImages: File[]) {
    setImagesToUpload(newImages);
  }

  async function imageDeleteHandler(url: string) {
    const oldImgs = form.getValues("images");
    const newImgs = oldImgs?.filter((img) => img !== url);
    form.setValue("images", newImgs);
    setFormImages(newImgs || []);
    if (!isNew) {
      try {
        await updateProduct(product?.id || "", form.getValues());
      } catch (e) {}
    }
    // TODO: delete image from cloudinary
    // const res = await destroyImage(url);
  }

  useEffect(() => {
    setFormImages(form.getValues("images") || []);
  }, [form.getValues("images")]);

  return (
    <div className="max-w-4xl mx-auto overflow-hidden px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ProductFormSection
            fieldsMap={fieldsMap.productInformation}
            title="Product Information"
            form={form}
          />
          <div className="mb-8">
            <ProductImageUpload
              images={formImages}
              onUpload={updateImagesToUpload}
              onDelete={imageDeleteHandler}
            />
          </div>
          <div className="mb-8">
            <ProductVideo form={form} />
          </div>
          <ProductFormSection
            fieldsMap={fieldsMap.wineDetails}
            title="Wine details"
            form={form}
          />

          <h2 className="font-bold text-lg my-6">
            Protected designation of origin and geographical indication
          </h2>
          {/* Designation of origin  */}
          <div className="mb-6">
            <FormField
              control={form.control}
              name="designationOfOrigin"
              render={({ field }) => (
                <FormItem className="max-w-md mx-auto">
                  <FormLabel>Designation of origin</FormLabel>
                  <FormControl>
                    <ReactSelect
                      value={{
                        label: field.value ?? "",
                        value: field.value ?? "",
                      }}
                      options={fieldsMap.designationOfOrigin.map((f) => ({
                        label: f,
                        value: f,
                      }))}
                      onChange={(val) => {
                        form.setValue("designationOfOrigin", val.value);
                      }}
                      isCreatable
                    />
                  </FormControl>
                  <FormMessage />
                  <span className="text-sm font-medium text-gray-500">
                    Select from dropdown or just type to create a new origin
                  </span>
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center my-2">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  className={cn("cursor-pointer", pdo ? "" : "grayscale")}
                  onClick={() => {
                    let currVal = form.getValues("pdo");
                    setPdo(!currVal);
                    form.setValue("pdo", !currVal);
                  }}
                  src="/images/pdo.png"
                  alt="doo pdo"
                  width={300 / 2}
                  height={336 / 2}
                />
                <Image
                  className={cn("cursor-pointer", pgi ? "" : "grayscale")}
                  onClick={() => {
                    let currVal = form.getValues("pgi");
                    setPgi(!currVal);
                    form.setValue("pgi", !currVal);
                  }}
                  src="/images/pgi.png"
                  alt="doo pgi"
                  width={300 / 2}
                  height={336 / 2}
                />
              </div>
            </div>
          </div>
          {/* Designation of origin - END  */}
          <h2 className="font-bold text-lg mt-6">Ingredients</h2>
          <ProductFormToggleSection
            title="Basic"
            fieldsMap={fieldsMap.ingredients.basic}
            form={form}
          />
          <ProductFormToggleSection
            title="Acidity Regulator"
            fieldsMap={fieldsMap.ingredients.acidityRegulator}
            form={form}
          />
          <ProductFormToggleSection
            title="Preservatives and antioxidants"
            fieldsMap={fieldsMap.ingredients.preservativesAndAntioxidant}
            form={form}
          />
          <ProductFormToggleSection
            title="Stabilizing agents"
            fieldsMap={fieldsMap.ingredients.stabilizingAgents}
            form={form}
          />
          <ProductFormToggleSection
            title="Gases and packaging gases"
            fieldsMap={fieldsMap.ingredients.gases}
            form={form}
          />
          <ProductFormSection
            fieldsMap={fieldsMap.nutrition}
            title="Nutrition information (100g/ml)"
            form={form}
          />
          <ProductFormSection
            fieldsMap={fieldsMap.recycling}
            title="Recycling materials"
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
