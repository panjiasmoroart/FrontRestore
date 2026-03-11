import { useNavigate } from "react-router-dom";
import { useFetchOrdersQuery } from "./orderApi";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function OrdersPage() {
  const { data: orders, isLoading } = useFetchOrdersQuery();
  const navigate = useNavigate();

  if (isLoading) return <Typography variant="h5">Loading orders...</Typography>;

  return <div>OrdersPage</div>;
}
