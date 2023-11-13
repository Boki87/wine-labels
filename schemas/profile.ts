import z from "zod";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().nullable(),
  email: z.string().email(),
  companyName: z.string().nullable(),
  companyIdentificationNumber: z.string().nullable(),
  gln: z.string().nullable(),
  companyAddress: z.string().nullable(),
  zip: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
});

type profileSchemaType = z.infer<typeof profileSchema>;

export { profileSchema, type profileSchemaType };
