import { FormControl, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";


const ReactHookFormSelect = ({
    name,
    label,
    control,
    defaultValue,
    children,
    ...props
  }) => {
    const labelId = `${name}-label`;
    return (
      <FormControl fullWidth {...props}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Controller
          render={({ field }) => (
            <Select fullWidth {...field} labelId={labelId} label={label}>
              {children}
            </Select>
          )}
         
          name={name}
          control={control}
          defaultValue={defaultValue}
        />
      </FormControl>
    );
  };
  export default ReactHookFormSelect;