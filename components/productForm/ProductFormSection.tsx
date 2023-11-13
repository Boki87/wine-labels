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
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";

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
            className={cn(`grid grid-cols-1 md:grid-cols-${cols} gap-4 mb-8`)}
            key={index + "_" + title}
          >
            {row.map((el: ProductMapType, index) => {
              if (el.key === "images") return null;
              return (
                <FormField
                  control={form.control}
                  name={el.key}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{el.label}</FormLabel>
                      {el.options && el.options !== "date" && (
                        <FormControl>
                          <ReactSelect
                            value={{
                              label:
                                el.options.find(
                                  (opt) => opt === form.getValues()[el.key]
                                ) || el.options[0],
                              value: form.getValues()[el.key] || el.default,
                            }}
                            options={el.options.map((opt) => ({
                              label: opt,
                              value: opt,
                            }))}
                            onChange={(val) => {
                              if (!val) return;
                              form.setValue(el.key, val.value);
                            }}
                          />
                        </FormControl>
                      )}
                      {!el.options && (
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      )}
                      {el.options && el.options === "date" && (
                        <FormControl>
                          {/* TODO: add date select */}
                          <input type="date" />
                        </FormControl>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                  key={index}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}
