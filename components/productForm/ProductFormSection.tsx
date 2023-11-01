import { ProductMapType } from "@/schemas/product";
import { Input } from "../ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import ReactSelect from "../ui/reactSelect";

interface ProductFormSectionProps {
  fieldsMap: Array<ProductMapType[]>;
  title: string;
  form: any;
}

export default function ProductFormSection({
  fieldsMap,
  title,
  form,
}: ProductFormSectionProps) {
  return (
    <>
      <h2 className="font-bold text-lg mb-1 mt-6">{title}</h2>
      {fieldsMap.map((row, index) => {
        const cols = row.length;

        return (
          <div
            className={`grid grid-cols-1 md:grid-cols-${cols} gap-4 mb-8`}
            key={index + "_" + title}
          >
            {row.map((el: ProductMapType, index) => (
              <FormField
                control={form.control}
                name={el.key}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{el.label}</FormLabel>
                    <FormControl>
                      {el.options && el.default && el.key !== "images" ? (
                        <ReactSelect
                          value={{
                            label:
                              el.options.find(
                                (opt) => opt === form.getValues()[el.key]
                              ) ||
                              el.options[0].charAt(0).toUpperCase() +
                                el.options[0].split("_").join(" ").slice(1),
                            value: form.getValues()[el.key] || el.default,
                          }}
                          options={el.options.map((opt) => ({
                            label:
                              opt.charAt(0).toUpperCase() +
                              opt.split("_").join(" ").slice(1),
                            value: opt,
                          }))}
                          onChange={(val) => {
                            if (!val) return;
                            form.setValue(el.key, val.value);
                          }}
                        />
                      ) : (
                        <Input {...field} value={field.value ?? ""} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                key={index}
              />
            ))}
          </div>
        );
      })}
    </>
  );
}
