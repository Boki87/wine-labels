"use client";
import React from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";

export type ReactSelectValue = {
  label: string;
  value: string;
};

interface ReactSelectProps {
  value?: ReactSelectValue;
  defaultVal?: ReactSelectValue;
  options: OptionsOrGroups<ReactSelectValue, GroupBase<ReactSelectValue>>;
  onChange: (value: ReactSelectValue) => void;
}

function ReactSelect({
  value,
  defaultVal,
  options,
  onChange,
}: ReactSelectProps) {
  return (
    <div>
      <Select
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
      />
    </div>
  );
}

export default ReactSelect;
