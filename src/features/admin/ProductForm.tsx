import { useForm } from "react-hook-form";
import {
  createProductSchema,
  type CreateProductSchema,
} from "../../lib/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AppTextInput from "../../app/shared/components/AppTextInput";
import { useFetchFiltersQuery } from "../catalog/catalogApi";
import AppSelectInput from "../../app/shared/components/AppSelectInput";

export default function ProductForm() {
  const { control, handleSubmit } = useForm({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
  });

  const { data } = useFetchFiltersQuery();

  const onSubmit = async (data: CreateProductSchema) => {
    console.log(data);
  };

  return (
    <Box component={Paper} sx={{ p: 4, maxWidth: "lg", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Product details
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <AppTextInput control={control} name="name" label="Product name" />
          </Grid>
          <Grid size={6}>
            {data?.brands && (
              <AppSelectInput
                items={data.brands}
                control={control}
                name="brand"
                label="Brand"
              />
            )}
          </Grid>
          <Grid size={6}></Grid>
          <Grid size={6}></Grid>
          <Grid size={6}></Grid>
          <Grid size={12}></Grid>
          <Grid size={12}></Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button
            // onClick={() => setEditMode(false)}
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <LoadingButton
            // loading={isSubmitting}
            variant="contained"
            color="success"
            type="submit"
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
