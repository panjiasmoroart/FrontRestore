import { Controller, useForm } from "react-hook-form";
import {
  createProductSchema,
  type CreateProductSchema,
} from "../../lib/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function ProductForm() {
  const { control, handleSubmit } = useForm({
    mode: "onTouched",
    // resolver: zodResolver(createProductSchema),
  });

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
            <Controller
              render={({ field }) => (
                <TextField {...field} fullWidth label="name" />
              )}
              name="name"
              control={control}
              defaultValue=""
            />
          </Grid>
          <Grid size={6}></Grid>
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
