import { useEffect, useState } from "react";

// const arrProducts = [
//   { name: "Product 1", price: 100 },
//   { name: "Product 2", price: 200 },
// ];

function App() {
  // const [products, setProducts] = useState(arrProducts);
  const [products, setProducts] = useState<{ name: string; price: number }[]>(
    [],
  );

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
        name: "Product " + (prevState.length + 1),
        price: (prevState.length + 1) * 100,
      },
    ]);
  };

  return (
    <div>
      <h1>Front Restore</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
