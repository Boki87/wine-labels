"use client";
import Select from "react-select";
import useCountries from "@/hooks/useCountries";

export type CountrySelectValue = {
  label: string;
  value: string;
  flag: string;
};

interface CountrySelectPros {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectPros) {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Pick a country"
        options={getAll()}
        defaultValue={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        classNames={{
          control: () => "px-1 py-[1px] border-2",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
          },
        })}
      />
    </div>
  );
}
