import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Form = ({
  formControll,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInput(getControlItem) {
    let elememt = null;
    const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        elememt = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        elememt = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={getControlItem.placeholder}
              ></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        elememt = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      default:
        elememt = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
          />
        );
        break;
    }
    return elememt;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControll.map((controolItem) => (
          <div className="grid w-full gap-1.5" key={controolItem.name}>
            <Label className="mb-1">{controolItem.label}</Label>
            {renderInput(controolItem)}
          </div>
        ))}
      </div>
      <Button className="mt-2 w-full">{buttonText || "submit"}</Button>
    </form>
  );
};

export default Form;
