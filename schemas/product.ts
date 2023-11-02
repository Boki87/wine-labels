import useCountries from "@/hooks/useCountries";
import z from "zod";

const productSchema = z.object({
  brand: z.string(),
  name: z.string(),
  category: z.string().default("wine"),
  sugarContent: z.string().default("not_applicable"),
  typeOfWine: z.string().default("white"),
  gramsOfAlcohol: z.string(),
  alcoholContents: z.string(),
  bestBefore: z.string().optional(),
  gtin: z.string(),
  lot: z.string(),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  country: z.string(),
  region: z.string(),
  locality: z.string(),
  year: z.string().default(new Date().getFullYear().toString()),
  contents: z.string().default("0,25 L"),
  package: z.string(),
});

type productSchemaType = z.infer<typeof productSchema>;

//maps
type ProductSchemaKeys = keyof productSchemaType;
export type ProductMapType = {
  label: string;
  key: ProductSchemaKeys;
  options?: "date" | string[];
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
        "Wine",
        "Young wine in the process of fermentation",
        "Liqueur wine",
        "Sparkling wine",
        "High-quality sparkling wine",
        "High-quality aromatic sparkling wine",
        "Carbonated sparking wine",
        "Pearl wine",
        "Carbonated pearl wine",
        "Must",
        "Partly fermented must",
        "Partly fermented must extracted from dried grapes",
        "Concentrated must",
        "Rectified concentrated must",
        "Wine from dried grapes",
        "Wine from overripe grapes",
      ],
      default: "Wine",
    },
    {
      label: "Sugar content",
      key: "sugarContent",
      options: [
        "Not applicable",
        "Brut natur",
        "Extra brut",
        "Brut",
        "Very dry",
        "Dry",
        "Semi-dry wine",
        "Sweet",
      ],
      default: "Not applicable",
    },
    {
      label: "Type of wine*",
      key: "typeOfWine",
      options: ["White", "Red", "Pink"],
      default: "White",
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

const { getAll } = useCountries();

function yearsToNow(): string[] {
  let currentYear = new Date().getFullYear();
  let yearSpan = 200;
  let startYear = currentYear - yearSpan;
  let years = [];
  for (let i = startYear; i <= currentYear; i++) {
    years.push(i.toString());
  }
  return years.reverse();
}

const wineDetails: Array<ProductMapType[]> = [
  [
    {
      label: "Country",
      key: "country",
      options: getAll().map((country) => country.label),
      default: "a",
    },
    {
      label: "Region*",
      key: "region",
    },
    {
      label: "Locality*",
      key: "locality",
    },
  ],
  [
    {
      label: "Year*",
      key: "year",
      options: yearsToNow(),
      default: (+new Date()).toString(),
    },
    {
      label: "Contents*",
      key: "contents",
      options: [
        "0,25 L",
        "0,33 L",
        "0,375 L",
        "0,5 L",
        "0,75 L",
        "1 L",
        "1,5 L",
        "2 L",
        "2,5 L",
        "3 L",
        "5 L",
        "6 L",
        "9 L",
        "10 L",
        "12 L",
        "15 L",
        "18 L",
      ],
      default: "0,75 L",
    },
    {
      label: "Package*",
      key: "package",
    },
  ],
];

const fieldsMap = {
  productInformation,
  wineDetails,
};

export { productSchema, type productSchemaType, fieldsMap };
