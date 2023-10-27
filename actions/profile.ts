"use server";
import { db } from "@/lib/prisma";
import { profileSchemaType } from "@/schemas/profile";
import { currentUser } from "@clerk/nextjs";
import { Profile } from "@prisma/client";

class UserNotFoundErr extends Error {}

export async function getProfile() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  let profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!profile) {
    profile = await db.profile.create({
      data: {
        firstName: user.firstName || "Username",
        lastName: user.lastName,
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }
  return profile;
}

export async function updateProfile(profile: profileSchemaType) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.profile.update({
    where: {
      userId: user.id,
    },
    data: profile,
  });
}
