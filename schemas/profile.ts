import z from "zod";

const profileSchema = z.object({
  firstName: z.string(),
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
