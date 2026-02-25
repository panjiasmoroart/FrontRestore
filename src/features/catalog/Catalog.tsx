// import { useEffect, useState } from "react";
// import type { Product } from "../../app/models/product";
import { Grid, Pagination } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppSelector } from "../../app/store/store";

// type Props = {
//   products: Product[];
// };

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading } = useFetchProductsQuery(productParams);

  // useEffect(() => {
  //   fetch("https://localhost:5001/api/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <Filters />
      </Grid>

      <Grid size={9}>
        <ProductList products={data.items} />
        <Pagination
          color="secondary"
          size="large"
          count={data.pagination?.totalPages}
          page={data.pagination?.currentPage}
        />
      </Grid>
    </Grid>
  );
}
