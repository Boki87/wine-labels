"use client";
import React from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import CreatableSelect from "react-select/creatable";

export type ReactSelectValue = {
  label: string;
  value: string;
};

interface ReactSelectProps {
  value?: ReactSelectValue;
  defaultVal?: ReactSelectValue;
  options: OptionsOrGroups<ReactSelectValue, GroupBase<ReactSelectValue>>;
  onChange: (value: ReactSelectValue) => void;
  isCreatable?: boolean;
}

function ReactSelect({
  value,
  defaultVal,
  options,
  onChange,
  isCreatable = false,
  ...props
}: ReactSelectProps) {
  const Comp = isCreatable ? CreatableSelect : Select;

  return (
    <div>
      <Comp
        options={options}
        defaultValue={value ?? defaultVal}
        onChange={(value) => onChange(value as ReactSelectValue)}
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
        instanceId={React.useId()}
        {...props}
      />
    </div>
  );
}

export default ReactSelect;
