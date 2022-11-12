import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import ReactHookFormSelect from "../../shared/ReactHookFormSelect";
import { Alert, MenuItem } from "@mui/material";

function BasicInfoTab({ product }) {
  const methods = useFormContext();
  const { control, formState, getValues } = methods;
  const { errors } = formState;

  const categories = product?.categories || [];
  const getRandomCategory = () => {
    if (categories.length === 0) return "";

    return product.categories[
      Math.floor(Math.random() * (product.categories.length - 1))
    ];
  };
  return (
    <div>
      {errors?.images && (
        <Alert severity="error">{errors?.images.message}</Alert>
      )}
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
      <ReactHookFormSelect
        name="category"
        control={control}
        className="mt-8 mb-16"
        defaultValue={getRandomCategory()}
        label="Category"
        variant="outlined"
        margin="normal"
      >
        {categories.map((c, index) => {
          return (
            <MenuItem key={index} value={c}>
              {c}
            </MenuItem>
          );
        })}
      </ReactHookFormSelect>

      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Color"
            autoFocus
            id="color"
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
