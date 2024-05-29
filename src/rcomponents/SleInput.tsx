import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DataItem {
  text: string;
  value: string | number | boolean;
}

interface paramsType {
  labelName?: string;
  selectPlace?: string;
  selectName?: string;
  options: DataItem[];
  handleSelectChange: (value: string, name: string) => void;
}

const SleInput: FC<paramsType> = ({
  labelName,
  selectPlace,
  options,
  selectName,
  handleSelectChange,
}) => {
  return (
    <>
      {labelName && (
        <Label htmlFor="list" className="text-right">
          {labelName}
        </Label>
      )}
      <div className="">
        <Select onValueChange={(value:string) => handleSelectChange(value, selectName)}>
          <SelectTrigger>
            <SelectValue placeholder={selectPlace} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((item, index) => (
                <SelectItem value={item.value}>{item.text}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SleInput;
