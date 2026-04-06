import { useForm, type FieldValues } from "react-hook-form";
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
import AppDropzone from "../../app/shared/components/AppDropzone";
import type { Product } from "../../app/models/product";
import { useEffect, useState } from "react";
import { useCreateProductMutation, useUpdateProductMutation } from "./adminApi";
import { handleApiError } from "../../lib/util";

type Props = {
  setEditMode: (value: boolean) => void;
  product: Product | null;
  refetch: () => void;
  setSelectedProduct: (value: Product | null) => void;
};

export default function ProductForm({
  setEditMode,
  product,
  refetch,
  setSelectedProduct,
}: Props) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const watchFile = watch("file") as (File & { preview?: string }) | undefined;
  const { data } = useFetchFiltersQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) reset(product);

    return () => {
      if (watchFile?.preview) URL.revokeObjectURL(watchFile.preview);
    };
  }, [product, reset, watchFile]);

  // const createFormData = (items: FieldValues) => {
  //   const formData = new FormData();
  //   for (const key in items) {
  //     formData.append(key, items[key]);
  //   }

  //   return formData;
  // };

  const createFormData = (data: FieldValues, product?: Product | null) => {
    const formData = new FormData();

    if (product) {
      formData.append("id", product.id.toString());
    }

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("type", data.type);
    formData.append("brand", data.brand);
    formData.append("quantityInStock", data.quantityInStock.toString());

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    return formData;
  };

  const onSubmit = async (data: CreateProductSchema) => {
    try {
      // const formData = createFormData(data);
      const formData = createFormData(data, product);

      if (product) {
        await updateProduct({ id: product.id, data: formData }).unwrap();
      } else {
        await createProduct(formData).unwrap();
      }

      refetch();
      setEditMode(false);
      setSelectedProduct(null);
    } catch (error) {
      console.log("Error submitting form : ", error);
      handleApiError<CreateProductSchema>(error, setError, [
        "brand",
        "description",
        "file",
        "name",
        "pictureUrl",
        "price",
        "quantityInStock",
        "type",
      ]);
    }
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
          <Grid size={6}>
            {data?.brands && (
              <AppSelectInput
                items={data.types}
                control={control}
                name="type"
                label="Type"
              />
            )}
          </Grid>
          <Grid size={6}>
            <AppTextInput
              type="number"
              control={control}
              name="price"
              label="Price in cents"
            />
          </Grid>
          <Grid size={6}>
            <AppTextInput
              type="number"
              control={control}
              name="quantityInStock"
              label="Quantity in stock"
            />
          </Grid>
          <Grid size={12}>
            <AppTextInput
              control={control}
              multiline
              rows={4}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid
            size={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <AppDropzone
              name="file"
              control={control}
              onFileSelected={(file, preview) => {
                setSelectedFile(file);
                setPreview(preview);
              }}
            />
            {/* {watchFile?.preview ? (
              <img
                src={watchFile.preview}
                alt="preview of image"
                style={{ maxHeight: 200 }}
              />
            ) : product?.pictureUrl ? (
              <img
                src={product?.pictureUrl}
                alt="preview of image"
                style={{ maxHeight: 200 }}
              />
            ) : null} */}
            {preview ? (
              <img
                src={preview}
                alt="preview of image"
                style={{ maxHeight: 200 }}
              />
            ) : product?.pictureUrl ? (
              <img
                src={product.pictureUrl}
                alt="preview of image"
                style={{ maxHeight: 200 }}
              />
            ) : null}
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button
            onClick={() => setEditMode(false)}
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
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
