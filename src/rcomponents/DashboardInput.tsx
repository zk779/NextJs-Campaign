import React, { FC, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ParamsType {
  labelName?: string;
  inputtype?: string;
  inputName?: string;
  inputValue?: string | number;
  inputId?: string;
  inputClass?: string;
  inputPlaceHolder?: string;
  
  // Change the type of onChange to directly accept the function signature
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DashboardInput: FC<ParamsType> = ({
  labelName,
  inputtype,
  inputName,
  inputValue,
  inputId,
  inputClass,
  inputPlaceHolder,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
  };

  return (
    <>
      {labelName && (
        <Label htmlFor={inputId} className="text-right">
          {labelName}
        </Label>
      )}
      <Input
        id={inputId}
        type={inputtype}
        value={inputValue}
        name={inputName}
        className={inputClass}
        placeholder={inputPlaceHolder}
        onChange={handleChange}
      />
    </>
  );
};

export default DashboardInput;
