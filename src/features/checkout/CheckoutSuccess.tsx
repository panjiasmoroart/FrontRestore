import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import type { Order } from "../../app/models/order";

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const order = state as Order;

  return (
    <Container maxWidth="md">
      <>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Thanks for your fake order! <br />
          {JSON.stringify(order, null, 2)}
        </Typography>
      </>
    </Container>
  );
}
