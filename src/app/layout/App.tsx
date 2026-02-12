import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";

// const arrProducts = [
//   { name: "Product 1", price: 100 },
//   { name: "Product 2", price: 200 },
// ];

function App() {
  // const [products, setProducts] = useState(arrProducts);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addProduct = () => {
    // setProducts([...products, { name: "Product 4", price: 40 }]);
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: "Product " + (prevState.length + 1),
        description: "Description for product " + (prevState.length + 1),
        price: (prevState.length + 1) * 100,
        pictureUrl: "https://via.placeholder.com/150",
        type: "Type " + (prevState.length + 1),
        brand: "Brand " + (prevState.length + 1),
        quantityInStock: 10,
      },
    ]);
  };

  return (
    <div>
      <h1 style={{ color: "red" }}>React Restore</h1>
      <Catalog products={products} addProduct={addProduct} />
    </div>
  );
}

export default App;
