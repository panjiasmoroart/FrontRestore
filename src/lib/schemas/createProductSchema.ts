import { z } from "zod";

const fileSchema = z.instanceof(File).refine(file => file.size > 0, {
  message: 'A file must be uploaded'
})

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name of product is required'),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters'
  }),
  price: z.coerce.number().min(100, 'Price must be at least $1.00'),
  type: z.string().min(1, 'Type is required'),
  brand: z.string().min(1, 'Brand is required'),
  quantityInStock: z.coerce.number().min(1, 'Quantity must be at least 1'),
  pictureUrl: z.string().optional(),
  file: fileSchema
})

export type CreateProductSchema = z.infer<typeof createProductSchema>;