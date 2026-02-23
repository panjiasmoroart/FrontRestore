// import { useEffect, useState } from "react";
// import type { Product } from "../../app/models/product";
import { Grid } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";

// type Props = {
//   products: Product[];
// };

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);
  const { data, isLoading } = useFetchProductsQuery();

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
        <ProductList products={data} />
      </Grid>
    </Grid>
  );
}
