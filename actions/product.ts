"use server";
import { productSchema, productSchemaType } from "@/schemas/product";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

class UserNotFoundErr extends Error {}

export async function getProducts() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.product.findMany({
    where: {
      userId: user.id,
    },
  });
}

export async function getProduct(id: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const product = await db.product.findUnique({ where: { id } });

  //check if user is owner of product
  if (product?.userId !== user.id) throw new Error("Not allowed to load asset");

  return product;
}

export async function updateProduct(id: string, data: productSchemaType) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const product = await db.product.findUnique({ where: { id } });

  //check if user is owner of product
  if (product?.userId !== user.id) throw new Error("Not allowed to load asset");

  const updatedProduct = await db.product.update({ data, where: { id } });
  revalidatePath("/products");
  return updatedProduct;
}

export async function createProduct(product: productSchemaType) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const newProduct = await db.product.create({
    data: {
      ...product,
      userId: user.id,
    },
  });

  revalidatePath("/products");
  return newProduct;
}
