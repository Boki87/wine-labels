import { ProductMapType, ProductSchemaKeys } from "@/schemas/product";
import { Input } from "../ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";

type IngredientProductMapType = ProductMapType & {
  default?: boolean;
};

interface ProductFormToggleSectionProps {
  fieldsMap: { label: string; key: ProductSchemaKeys; default?: boolean }[];
  title: string;
  form: any;
}

export default function ProductFormToggleSection({
  fieldsMap,
  title,
  form,
}: ProductFormToggleSectionProps) {
  return (
    <>
      <h2 className="font-bold text-lg mb-1 mt-6">{title}</h2>
      <div className="">
        {fieldsMap.map((el, index) => {
          return (
            <FormField
              control={form.control}
              name={el.key}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 float-left mr-2 mb-2">
                  <FormLabel className="">{el.label}</FormLabel>
                  <FormControl>
                    <Switch
                      style={{ margin: "0px" }}
                      checked={field.value}
                      onCheckedChange={(val) => {
                        form.setValue(el.key, val);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              key={index}
            />
          );
        })}
        <div className="clear-both"></div>
      </div>
    </>
  );
}
