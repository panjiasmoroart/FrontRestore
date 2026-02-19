import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Basket } from "../../app/models/basket";
// import type { Product } from "../../app/models/product";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => "basket",
    }),
    addBasketItem: builder.mutation<Basket, { productId: number, quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: 'POST'
      })
    }),
    removeBasketItem: builder.mutation<void, { productId: number, quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: 'DELETE'
      })
    })
  })
});

export const { useFetchBasketQuery, useAddBasketItemMutation, useRemoveBasketItemMutation } = basketApi;