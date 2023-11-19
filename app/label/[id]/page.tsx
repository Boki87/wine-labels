import { getProduct } from "@/actions/product";
import ImageSlider from "@/components/ImageSlider";
import React from "react";
import { LiaRecycleSolid } from "react-icons/lia";
import { format } from "date-fns"

interface LabelPageProps {
    params: {
        id: string;
    };
}

async function LabelPage({ params }: LabelPageProps) {
    const { id } = params;
    const product = await getProduct(id);

    const allergens = [
        { "Sulphur dioxide": product.sulphurDioxide },
        { Tannins: product.tannins },
        { Histamine: product.histamine },
    ];

    const showAllergens = allergens
        .map((el) => Object.values(el)[0])
        .some((el) => el);

    const allergenTitles = allergens
        .filter((al) => {
            if (Object.values(al)[0]) return al;
        })
        .map((al) => {
            return Object.keys(al)[0];
        })
        .join(", ");

    return (
        <div className="px-5 py-10">
            <div className="max-w-lg mx-auto">
                <div className="text-3xl font-bold text-center space-x-2 mb-4">
                    <span>{product.brand}</span>
                    <span>{product.name}</span>
                    <span>{product.year}</span>
                </div>
                <div className="text-2xl font-bold text-center space-x-2 mb-4">
                    <span>{product.country},</span>
                    <span>{product.region},</span>
                    <span>{product.locality},</span>
                    <br />
                    <span>{product.contents},</span>
                    <span>{product.typeOfWine}</span>
                </div>
                <div className="text-center font-bold mb-8">
                    <div className="mb-1">
                        Alcohol contents {product.alcoholContents}%
                    </div>
                    <div className="mb-1">{product.sugarContent}</div>
                    {product.bestBefore && <div className="mb-1">Best before {format(product.bestBefore, "PPP")}</div>}
                </div>
                {product.images.length > 0 && <ImageSlider images={product.images} />}
                {showAllergens && (
                    <div className="mt-8 mb-4">
                        <p className="font-bold text-2xl text-center">Allergens</p>
                        <div className="text-red-500 font-bold text-center">
                            {allergenTitles}
                        </div>
                    </div>
                )}
                <div className="mb-8">
                    <p className="font-bold text-2xl text-center mb-3">Ingredients</p>
                    <div className="text-center">
                        <p>{getIngredients(product).join(", ")}</p>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-2xl text-center mb-3">
                        Nutrition information
                    </p>
                    <div className="max-w-lg mx-auto border-2 border-black p-6">
                        <div className="flex justify-end ">100 ml</div>
                        <div className="w-full border-b-4 border-black"></div>
                        <div className="flex justify-between font-bold h-10 items-center">
                            <span>Energy (kJ/kcal)</span>
                            <span>
                                {product.energyKj}/{product.energyCal}
                            </span>
                        </div>
                        <div className="w-full border-b border-gray-300"></div>
                        <div className="flex justify-between font-bold h-10 items-center">
                            <span>Fat (g)</span>
                            <span>{product.fat}</span>
                        </div>
                        <div className="flex justify-between -mt-2 items-center">
                            <span>of which saturates (g)</span>
                            <span>{product.saturatedFats}</span>
                        </div>
                        <div className="w-full border-b border-gray-300 mt-2"></div>
                        <div className="flex justify-between font-bold h-10 items-center">
                            <span>Carbohydrates (g)</span>
                            <span>{product.carbohydrates}</span>
                        </div>
                        <div className="flex justify-between -mt-2 items-center">
                            <span>of which Sugars (g)</span>
                            <span>{product.sugars}</span>
                        </div>
                        <div className="w-full border-b border-gray-300 mt-2"></div>
                        <div className="flex justify-between font-bold h-10 items-center">
                            <span>Proteins (g)</span>
                            <span>{product.proteins}</span>
                        </div>
                        <div className="w-full border-b border-gray-300"></div>
                        <div className="flex justify-between font-bold h-10 items-center">
                            <span>Salt (g)</span>
                            <span>{product.salt}</span>
                        </div>
                    </div>
                </div>
                <div className="my-8">
                    <p className="font-bold text-2xl text-center mb-2">
                        Recycling materials
                    </p>
                    <p className="text-center mb-3">
                        Always check the disposal regulations of your municipality
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {getRecycling(product).map((material) => (
                            <RecyclingMaterialTile
                                type={material[0]}
                                label={material[1]}
                                short={material[2]}
                                percentage={material[3]}
                                key={material[0]}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <p className="font-bold text-2xl text-center mb-2">
                        Responsible consumption
                    </p>
                    <img src="/images/responsible.png" className="w-full" />
                </div>
            </div>
        </div>
    );
}

export default LabelPage;

interface RecyclingMaterialTileProps {
    type: string;
    label: string;
    short: string;
    percentage: number;
}
function RecyclingMaterialTile({
    type,
    label,
    short,
    percentage,
}: RecyclingMaterialTileProps) {
    return (
        <div className="flex border border-gray-300 rounded-md p-4">
            <div className="flex-1 flex flex-col">
                <span className="font-bold text-lg capitalize">{type}</span>
                <span>{label}</span>
            </div>
            <div className="flex flex-col items-center min-w-[50px]">
                <div className="relative flex-1 w-full">
                    <div className="absolute top-0 left-0 z-10 h-full w-full flex items-center justify-center">
                        <LiaRecycleSolid size={46} />
                    </div>
                    <div className="absolute top-0 left-0 z-20 h-full w-full flex items-center justify-center text-xs">
                        <span>{percentage}</span>
                    </div>
                </div>
                <div className="text-xs">{short}</div>
            </div>
        </div>
    );
}

function getRecycling(obj: any) {
    const materials = {
        bottle: [
            ["Colorless glass", "GL", 70],
            ["Green-blue glass", "GL", 71],
            ["Brown glass", "GL", 72],
        ],
        cork: [
            ["Cork", "FOR", 51],
            ["Synthetic", "LDPE", 4],
            ["Aluminium screw cap", "C/ALU", 90],
        ],
        capsule: [
            ["PVC with aluminium", "C/PVC", 90],
            ["PET with aluminium", "C/PET", 90],
            ["Tin", "TIN", 42],
            ["Aluminium polyamide complexe", "C/ALU", 90],
        ],
        muselete: [["Steel", "FE", 40]],
        box: [
            ["Cardboard", "PAP", 20],
            ["Wood", "FOR", 50],
        ],
        case: [["Cardboard", "PAP", 20]],
        wrapper: [["Paper", "PAP", 22]],
        can: [["Aluminium", "ALU", 41]],
    };

    const materialKeys = Object.keys(materials);
    const arr: [string, string, string, number][] = [];
    materialKeys.forEach((material) => {
        if (obj[material] && obj[material] !== "--") {
            //@ts-ignore
            const res = materials[material].filter((m) => m[0] === obj[material])[0];
            //@ts-ignore
            arr.push([material, ...res]);
        }
    });

    return arr;
}

function getIngredients(obj: any) {
    const ingredientMap = [
        {
            key: "grape",
            label: "Grape",
        },
        {
            key: "sucrose",
            label: "Sucrose",
        },
        {
            key: "concentratedGrapeMust",
            label: "Concentrated Grape Must",
        },
        {
            key: "tirageLiquor",
            label: "Tirage liquor (sparkling wine)",
        },
        {
            key: "tartaricAcid",
            label: "Tartaric Acid",
        },
        {
            key: "malicAcid",
            label: "Malic Acid",
        },
        {
            key: "lacticAcid",
            label: "Lactic Acid",
        },
        {
            key: "potassiumTartrate",
            label: "Potassium Tartrate",
        },
        {
            key: "potassiumBicarbonate",
            label: "Potassium Bicarbonate",
        },
        {
            key: "calciumCarbonate",
            label: "Calcium Carbonate",
        },
        {
            key: "calciumTartrate",
            label: "Calcium Tartrate",
        },
        {
            key: "calciumSulphate",
            label: "Calcium Sulphate",
        },
        {
            key: "potassiumCarbonate",
            label: "Potassium Carbonate",
        },
        {
            key: "sulphurDioxide",
            label: "Sulphur Dioxide",
        },
        {
            key: "potassiumBisulphite",
            label: "Potassium Bisulphite",
        },
        {
            key: "potassiumMetabisulphite",
            label: "Potassium Metabisulphite",
        },
        {
            key: "potassiumSorbate",
            label: "Potassium Sorbate",
        },
        {
            key: "lyusozyme",
            label: "Lyusozyme",
        },
        {
            key: "lAscorbicAcid",
            label: "L-ascorbic acid",
        },
        {
            key: "dimethylDicarbonate",
            label: "Dimethyl Dicarbonate",
        },
        {
            key: "potassiumHydrogenTartrate",
            label: "Potassium Hydrogen Tartrate",
        },
        {
            key: "citricAcid",
            label: "Citric Acid",
        },
        {
            key: "tannins",
            label: "Tannins",
        },
        {
            key: "histamine",
            label: "Histamine",
        },
        {
            key: "potassiumFerrocyanide",
            label: "Potassium Ferrocyanide",
        },
        {
            key: "calciumPhytate",
            label: "Calcium Phytate",
        },
        {
            key: "metatarrtaricAcid",
            label: "Metatarrtaric Acid",
        },
        {
            key: "gumArabic",
            label: "Gum Arabic",
        },
        {
            key: "neutralPotassiumSalt",
            label: "Neutral PotassiumSalt",
        },
        {
            key: "yeastMannoproteins",
            label: "Yeast Mannoproteins",
        },
        {
            key: "carboxymethylcellulose",
            label: "Carboxymethylcellulose",
        },
        {
            key: "pviPvp",
            label: "Pvi / pvp",
        },
        {
            key: "potassiumPolyspartate",
            label: "Potassium Polyspartate",
        },
        {
            key: "nitroget",
            label: "Nitroget",
        },
        {
            key: "argon",
            label: "Argon",
        },
        {
            key: "oxygen",
            label: "Oxygen",
        },
        {
            key: "carbon",
            label: "Carbon dioxide",
        },
    ];

    return ingredientMap
        .filter((ing) => {
            if (obj[ing.key]) {
                return ing;
            }
        })
        .map((ing) => ing.label);
}
