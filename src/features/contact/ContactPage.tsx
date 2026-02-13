import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, type CounterState } from "./counterReducer";

export default function ContactPage() {
  const data = useSelector((state: CounterState) => state.data);
  const dispatch = useDispatch();

  return (
    <>
      <Typography variant="h2">Contact Page</Typography>

      <Typography variant="body1">The data is: {data}</Typography>

      <ButtonGroup>
        <Button color="error" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
        <Button color="secondary" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button color="secondary" onClick={() => dispatch(increment(5))}>
          Increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
}
