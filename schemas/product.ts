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
    bestBefore: z.date().optional(),
    gtin: z.string(),
    lot: z.string(),
    images: z.array(z.string()).optional(),
    videoUrl: z.string().default("").optional(),
    country: z.string(),
    region: z.string(),
    locality: z.string(),
    year: z.string().default(new Date().getFullYear().toString()),
    contents: z.string().default("0,25 L"),
    package: z.string(),
    designationOfOrigin: z.string().optional(),
    pdo: z.boolean().default(false),
    pgi: z.boolean().default(false),

    //ingredients
    //basic
    grape: z.boolean().default(false),
    sucrose: z.boolean().default(false),
    concentratedGrapeMust: z.boolean().default(false),
    tirageLiquor: z.boolean().default(false),
    //acidity regulator
    tartaricAcid: z.boolean().default(false),
    malicAcid: z.boolean().default(false),
    lacticAcid: z.boolean().default(false),
    potassiumTartrate: z.boolean().default(false),
    potassiumBicarbonate: z.boolean().default(false),
    calciumCarbonate: z.boolean().default(false),
    calciumTartrate: z.boolean().default(false),
    calciumSulphate: z.boolean().default(false),
    potassiumCarbonate: z.boolean().default(false),
    //preservatives and antioxidant
    sulphurDioxide: z.boolean().default(false),
    potassiumBisulphite: z.boolean().default(false),
    potassiumMetabisulphite: z.boolean().default(false),
    potassiumSorbate: z.boolean().default(false),
    lyusozyme: z.boolean().default(false),
    lAscorbicAcid: z.boolean().default(false),
    dimethylDicarbonate: z.boolean().default(false),
    //stabilizing agents
    potassiumHydrogenTartrate: z.boolean().default(false),
    citricAcid: z.boolean().default(false),
    tannins: z.boolean().default(false),
    histamine: z.boolean().default(false),
    potassiumFerrocyanide: z.boolean().default(false),
    calciumPhytate: z.boolean().default(false),
    metatarrtaricAcid: z.boolean().default(false),
    gumArabic: z.boolean().default(false),
    neutralPotassiumSalt: z.boolean().default(false),
    yeastMannoproteins: z.boolean().default(false),
    carboxymethylcellulose: z.boolean().default(false),
    pviPvp: z.boolean().default(false),
    potassiumPolyspartate: z.boolean().default(false),
    //gases and packaging gases
    nitroget: z.boolean().default(false),
    argon: z.boolean().default(false),
    oxygen: z.boolean().default(false),
    carbon: z.boolean().default(false),
    //nutrition information
    energyCal: z.string({
        required_error: "Required",
        invalid_type_error: "Required",
    }),
    energyKj: z.string({
        required_error: "Required",
        invalid_type_error: "Required",
    }),
    fat: z.string({
        required_error: "Required",
        invalid_type_error: "Required",
    }),
    saturatedFats: z.string({
        required_error: "Required",
        invalid_type_error: "Required",
    }),
    carbohydrates: z.string({
        required_error: "Required",
        invalid_type_error: "Required",
    }),
    sugars: z.string({
        required_error: "Required",
        invalid_type_error: "Required",
    }),
    proteins: z.string({
        required_error: "Required",
        invalid_type_error: "Required",
    }),
    salt: z.string({
        required_error: "Required",
        invalid_type_error: "Required",
    }),

    //recycling
    bottle: z.string().default("").optional(),
    cork: z.string().default("").optional(),
    capsule: z.string().default("").optional(),
    muselete: z.string().default("").optional(),
    box: z.string().default("").optional(),
    case: z.string().default("").optional(),
    wrapper: z.string().default("").optional(),
    can: z.string().default("").optional(),
});

type productSchemaType = z.infer<typeof productSchema>;

//maps
export type ProductSchemaKeys = keyof productSchemaType;
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
            options: "date"
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

const designationOfOrigin = [
    "Istočna kontinentalna Hrvatska",
    "Hrvatsko Podunavlje",
    "Slavonija",
    "Zapadna kontinentalna Hrvatska",
    "Moslavina",
    "Prigorje-Bilogora",
    "Plešivica",
    "Pokuplje",
    "Zagorje-Međimurje",
    "Hrvatska Istra",
    "Hrvatsko primorje",
    "Sjeverna Dalmacija",
    "Dalmatinska zagora",
    "Srednja i Južna Dalmacija",
    "Dingač",
    "Ponikve",
    "Muškat momjanski / Moscato di Momiano",
    "Lumbarda (prijelazna nacionalna zaštita)",
];

interface Ingredients {
    [key: string]: Array<{
        label: string;
        key: ProductSchemaKeys;
        default?: boolean;
    }>;
}

const ingredients: Ingredients = {
    basic: [
        {
            label: "Grape",
            key: "grape",
            default: false,
        },
        {
            label: "Sucrose",
            key: "sucrose",
            default: false,
        },
        {
            label: "Concentrated grape must",
            key: "concentratedGrapeMust",
            default: false,
        },
        {
            label: "Tirage liquor (sparkling wine)",
            key: "tirageLiquor",
            default: false,
        },
    ],
    acidityRegulator: [
        {
            label: "Tartaric Acid",
            key: "tartaricAcid",
            default: false,
        },
        {
            label: "Malic Acid",
            key: "malicAcid",
            default: false,
        },
        {
            label: "Lactic Acid",
            key: "lacticAcid",
            default: false,
        },
        {
            label: "Potassium Tartrate",
            key: "potassiumTartrate",
            default: false,
        },
        {
            label: "Potassium Bicarbonate",
            key: "potassiumBicarbonate",
            default: false,
        },
        {
            label: "Calcium Carbonate",
            key: "calciumCarbonate",
            default: false,
        },
        {
            label: "Calcium Tartrate",
            key: "calciumTartrate",
            default: false,
        },
        {
            label: "Calcium Sulphate",
            key: "calciumSulphate",
            default: false,
        },
        {
            label: "Potassium Carbonate",
            key: "potassiumCarbonate",
            default: false,
        },
    ],
    preservativesAndAntioxidant: [
        {
            label: "Sulphur Dioxide",
            key: "sulphurDioxide",
            default: false,
        },
        {
            label: "Potassium Bisulphite",
            key: "potassiumBisulphite",
            default: false,
        },
        {
            label: "Potassium Metabisulphite",
            key: "potassiumMetabisulphite",
            default: false,
        },
        {
            label: "Potassium Sorbate",
            key: "potassiumSorbate",
            default: false,
        },
        {
            label: "Lyusozyme",
            key: "lyusozyme",
            default: false,
        },
        {
            label: "L-ascorbic acid",
            key: "lAscorbicAcid",
            default: false,
        },
        {
            label: "Dimethyl Dicarbonate",
            key: "dimethylDicarbonate",
            default: false,
        },
    ],
    stabilizingAgents: [
        {
            label: "Potassium Hydrogen Tartrate",
            key: "potassiumHydrogenTartrate",
            default: false,
        },
        {
            label: "Citric Acid",
            key: "citricAcid",
            default: false,
        },
        {
            label: "Tannins",
            key: "tannins",
            default: false,
        },
        {
            label: "Histamine",
            key: "histamine",
            default: false,
        },
        {
            label: "Potassium Ferrocyanide",
            key: "potassiumFerrocyanide",
            default: false,
        },
        {
            label: "Calcium Phytate",
            key: "calciumPhytate",
            default: false,
        },
        {
            label: "Metatarrtaric Acid",
            key: "metatarrtaricAcid",
            default: false,
        },
        {
            label: "Gum Arabic",
            key: "gumArabic",
            default: false,
        },
        {
            label: "Neutral PotassiumSalt",
            key: "neutralPotassiumSalt",
            default: false,
        },
        {
            label: "Yeast Mannoproteins",
            key: "yeastMannoproteins",
            default: false,
        },
        {
            label: "Carboxymethylcellulose",
            key: "carboxymethylcellulose",
            default: false,
        },
        {
            label: "Pvi / pvp",
            key: "pviPvp",
            default: false,
        },
        {
            label: "Potassium Polyaspartate",
            key: "potassiumPolyspartate",
            default: false,
        },
    ],

    gases: [
        {
            label: "Nitroget",
            key: "nitroget",
            default: false,
        },
        {
            label: "Argon",
            key: "argon",
            default: false,
        },
        {
            label: "Oxygen",
            key: "oxygen",
            default: false,
        },
        {
            label: "Carbon",
            key: "carbon",
            default: false,
        },
    ],
};

const nutrition: Array<ProductMapType[]> = [
    [
        {
            label: "Energy - kCal*",
            key: "energyCal",
        },
        {
            label: "Energy - kJ*",
            key: "energyKj",
        },
        {
            label: "Fat - g*",
            key: "fat",
        },
        {
            label: "Saturated Fats - g*",
            key: "saturatedFats",
        },
    ],
    [
        {
            label: "Carbohydrates - g*",
            key: "carbohydrates",
        },
        {
            label: "Sugars - g*",
            key: "sugars",
        },
        {
            label: "Proteins - g*",
            key: "proteins",
        },
        {
            label: "Salt - g*",
            key: "salt",
        },
    ],
];

//recycling materials
const recycling: Array<ProductMapType[]> = [
    [
        {
            label: "Bottle",
            key: "bottle",
            options: ["--", "Colorless glass", "Green-blue glass", "Brown glass"],
            default: "",
        },
        {
            label: "Cork",
            key: "cork",
            options: ["--", "Cork", "Synthetic", "Aluminium screw cap"],
            default: "",
        },
        {
            label: "Capsule",
            key: "capsule",
            options: [
                "--",
                "PVC with aluminium",
                "PET with aluminium",
                "Tin",
                "Aluminium polyamide complexe",
            ],
            default: "",
        },
        {
            label: "Muselete",
            key: "muselete",
            options: ["--", "Steel"],
            default: "",
        },
    ],
    [
        {
            label: "Box",
            key: "box",
            options: ["--", "Cardboard", "Wood"],
            default: "",
        },
        {
            label: "Case",
            key: "case",
            options: ["--", "Cardboard"],
            default: "",
        },
        {
            label: "Wrapper",
            key: "wrapper",
            options: ["--", "Paper"],
            default: "",
        },
        {
            label: "Can",
            key: "can",
            options: ["--", "Aluminium"],
            default: "",
        },
    ],
];

const fieldsMap = {
    productInformation,
    wineDetails,
    designationOfOrigin,
    ingredients,
    nutrition,
    recycling,
};

export { productSchema, type productSchemaType, fieldsMap };
