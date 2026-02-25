// import { useEffect, useState } from "react";
// import type { Product } from "../../app/models/product";
import { Grid, Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

// type Props = {
//   products: Product[];
// };

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const { data: filtersData, isLoading: filtersLoading } =
    useFetchFiltersQuery();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   fetch("https://localhost:5001/api/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);

  if (isLoading || !data || filtersLoading || !filtersData)
    return <div>Loading...</div>;

  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <Filters filtersData={filtersData} />
      </Grid>

      <Grid size={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <ProductList products={data.items} />
            <AppPagination
              metadata={data.pagination}
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <Typography variant="h5">
            There are no results for this filter
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
