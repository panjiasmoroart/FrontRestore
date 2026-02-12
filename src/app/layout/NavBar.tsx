import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

type Props = {
  toogleDarkMode: () => void;
  darkMode: boolean;
};

export default function NavBar({ toogleDarkMode, darkMode }: Props) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">.NET React</Typography>
          <IconButton onClick={toogleDarkMode}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
