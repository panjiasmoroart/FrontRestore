import { useForm } from "react-hook-form";
import { createProductSchema } from "../../lib/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProductForm() {
  useForm({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
  });

  return <div>ProductForm</div>;
}
