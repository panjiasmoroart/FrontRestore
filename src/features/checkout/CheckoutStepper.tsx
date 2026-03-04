import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type {
  StripeAddressElementChangeEvent,
  StripePaymentElementChangeEvent,
  ConfirmationToken,
} from "@stripe/stripe-js";
import { useState } from "react";
import {
  useFetchAddressQuery,
  useUpdateUserAddressMutation,
} from "../account/accountApi";
import Review from "./Review";
import type { Address } from "../../app/models/user";
import LoadingButton from "@mui/lab/LoadingButton";
import { useBasket } from "../../lib/hooks/useBasket";
import { currencyFormat } from "../../lib/util";
import { toast } from "react-toastify";

const steps = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const { data: { name, ...restAddress } = {} as Address, isLoading } =
    useFetchAddressQuery();
  // const { data, isLoading } = useFetchAddressQuery();
  const [updateAddress] = useUpdateUserAddressMutation();
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const [addressComplete, setAddressComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { total } = useBasket();
  const [confirmationToken, setConfirmationToken] =
    useState<ConfirmationToken | null>(null);

  // let name, restAddress;
  // if (data) {
  //   ({ name, ...restAddress } = data);
  // }

  const handleNext = async () => {
    if (activeStep === 0 && saveAddressChecked && elements) {
      const address = await getStripeAddress();
      if (address) await updateAddress(address);
    }
    if (activeStep === 1) {
      if (!elements || !stripe) return;
      const result = await elements.submit();
      if (result.error) return toast.error(result.error.message);

      const stripeResult = await stripe.createConfirmationToken({ elements });
      if (stripeResult.error) return toast.error(stripeResult.error.message);
      setConfirmationToken(stripeResult.confirmationToken);
    }
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  const getStripeAddress = async () => {
    const addressElement = elements?.getElement("address");
    if (!addressElement) return null;
    const {
      value: { name, address },
    } = await addressElement.getValue();

    if (name && address) return { ...address, name };

    return null;
  };

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    setAddressComplete(event.complete);
  };

  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    setPaymentComplete(event.complete);
  };

  if (isLoading)
    return <Typography variant="h6">Loading checkout...</Typography>;

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          Address step
          <AddressElement
            // options={{
            //   mode: "shipping",
            // }}
            options={{
              mode: "shipping",
              defaultValues: {
                name: name,
                address: restAddress,
              },
            }}
            onChange={handleAddressChange}
          />
          <FormControlLabel
            sx={{ display: "flex", justifyContent: "end" }}
            control={
              <Checkbox
                checked={saveAddressChecked}
                onChange={(e) => setSaveAddressChecked(e.target.checked)}
              />
            }
            label="Save as default address"
          />
        </Box>

        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <PaymentElement onChange={handlePaymentChange} />
        </Box>

        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Review confirmationToken={confirmationToken} />
        </Box>
      </Box>

      <Box display="flex" paddingTop={2} justifyContent="space-between">
        <Button onClick={handleBack}>Back</Button>
        <LoadingButton
          onClick={handleNext}
          disabled={
            (activeStep === 0 && !addressComplete) ||
            (activeStep === 1 && !paymentComplete) ||
            submitting
          }
          loading={submitting}
        >
          {activeStep === steps.length - 1
            ? `Pay ${currencyFormat(total)}`
            : "Next"}
        </LoadingButton>
      </Box>
    </Paper>
  );
}
