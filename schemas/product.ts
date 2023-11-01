import z from "zod";

const productSchema = z.object({
  brand: z.string(),
  name: z.string(),
  category: z.string().default("wine"),
  sugarContent: z.string().default("not_applicable"),
  typeOfWine: z.string().default("white"),
  gramsOfAlcohol: z.string(),
  alcoholContents: z.string(),
  bestBefore: z.string().nullable().optional(),
  gtin: z.string(),
  lot: z.string(),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().nullable().optional(),
});

type productSchemaType = z.infer<typeof productSchema>;

//maps
type ProductSchemaKeys = keyof productSchemaType;
export type ProductMapType = {
  label: string;
  key: ProductSchemaKeys;
  options?: string[];
  default?: string;
};
const productInformation: Array<ProductMapType[]> = [
  [
    {
      label: "Brand*",
      key: "brand",
    },
    {
      label: "Name*",
      key: "name",
    },
  ],
  [
    {
      label: "Category*",
      key: "category",
      options: [
        "wine",
        "young_wine_in_the_process_of_fermentation",
        "liqueur_wine",
        "sparkling_wine",
        "high-quality_sparkling_wine",
        "high-quality_aromatic_sparkling_wine",
        "carbonated_sparking_wine",
        "pearl_wine",
        "carbonated_pearl_wine",
        "must",
        "partly_fermented_must",
        "partly_fermented_must_extracted_from_dried_grapes",
        "concentrated_must",
        "rectified_concentrated_must",
        "wine_from_dried_grapes",
        "wine_from_overripe_grapes",
      ],
      default: "wine",
    },
    {
      label: "Sugar content",
      key: "sugarContent",
      options: [
        "not_applicable",
        "brut_natur",
        "extra_brut",
        "brut",
        "very_dry",
        "dry",
        "semi-dry_wine",
        "sweet",
      ],
      default: "not_applicable",
    },
    {
      label: "Type of wine*",
      key: "typeOfWine",
      options: ["white", "red", "pink"],
      default: "white",
    },
  ],
  [
    {
      label: "Grams of alcohol*",
      key: "gramsOfAlcohol",
    },
    {
      label: "Alcohol contents*",
      key: "alcoholContents",
    },
    {
      label: "Best before",
      key: "bestBefore",
    },
  ],
  [
    {
      label: "GTIN",
      key: "gtin",
    },
    {
      label: "LOT",
      key: "lot",
    },
  ],
];

const fieldsMap = {
  productInformation,
};

export { productSchema, type productSchemaType, fieldsMap };
