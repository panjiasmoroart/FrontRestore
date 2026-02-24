import { createApi } from '@reduxjs/toolkit/query/react';
import type { Product } from '../../app/models/product';
import { baseQueryWithErrorHandling } from '../../app/api/baseApi';
import type { ProductParams } from '../../app/models/ProductParams';
import { filterEmptyValues } from '../../lib/util';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], ProductParams>({
      query: (productParams) => {
        // const filteredParams = Object.fromEntries(
        //   Object.entries(productParams).filter(
        //     ([, value]) => value !== '' && value !== null
        //       && value !== undefined && value.length !== 0
        //   )
        // )

        return {
          url: 'products',
          params: filterEmptyValues(productParams)
        }
      },
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => ({ url: `products/${productId}` }),
    }),
    fetchFilters: builder.query<{ brands: string[], types: string[] }, void>({
      query: () => ({ url: 'products/filters' }),
    }),
  }),
})

export const {
  useFetchProductsQuery,
  useFetchProductDetailsQuery,
  useFetchFiltersQuery
} = catalogApi;