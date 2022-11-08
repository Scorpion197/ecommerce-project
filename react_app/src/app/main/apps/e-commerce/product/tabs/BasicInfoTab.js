import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Category"
            autoFocus
            id="category"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="weight"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            helperText={errors?.name?.message}
            label="Weight"
            autoFocus
            id="weight"
            variant="outlined"
            fullWidth
            type="number"
          />
        )}
      />
      <Controller
        name="barcode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            helperText={errors?.name?.message}
            label="Barcode"
            autoFocus
            id="barcode"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="sku"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            helperText={errors?.name?.message}
            label="SKU"
            autoFocus
            id="sku"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="quantity"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Quantity"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            type="number"
          />
        )}
      />
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Price"
            autoFocus
            id="price"
            variant="outlined"
            type="number"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
