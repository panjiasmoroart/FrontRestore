import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAppSelector } from "../store/store";

// const arrProducts = [
//   { name: "Product 1", price: 100 },
//   { name: "Product 2", price: 200 },
// ];

function App() {
  // const [products, setProducts] = useState(arrProducts);

  const { darkMode } = useAppSelector((state) => state.ui);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  // const toogleDarkMode = () => {
  //   localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  //   setDarkMode(!darkMode);
  // };

  return (
    <ThemeProvider theme={theme}>
      <ScrollRestoration />
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "radial-gradient(circle, #1e3aBa, #111B27)"
            : "radial-gradient(circle, #baecf9, #f0f9ff)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          {/* <Catalog /> */}
          {/* dynaminc content */}
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
