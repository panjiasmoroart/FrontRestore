import { Container, Typography } from "@mui/material";

export default function CheckoutSuccess() {
  return (
    <Container maxWidth="md">
      <>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Thanks for your fake order!
        </Typography>
      </>
    </Container>
  );
}
