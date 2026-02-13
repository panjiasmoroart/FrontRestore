import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

type Props = {
  toogleDarkMode: () => void;
  darkMode: boolean;
};

// const navStyles = {
//   color: "inherit",
//   typography: "h6",
//   textDecoration: "none",
//   "&:hover": {
//     color: "grey.500",
//   },
//   "&.active": {
//     color: "#baecf9",
//   },
// };

export default function NavBar({ toogleDarkMode, darkMode }: Props) {
  return (
    <AppBar position="fixed">
      <Toolbar
      // sx={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   alignItems: "center",
      // }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/">
            .NET React
          </Typography>
          <IconButton onClick={toogleDarkMode}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{ color: "inherit", typography: "h6" }}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <IconButton
          component={NavLink}
          to="/basket"
          size="large"
          sx={{ color: "inherit" }}
        >
          <Badge badgeContent="4" color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <List sx={{ display: "flex" }}>
          {rightLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{ color: "inherit", typography: "h6" }}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
}
