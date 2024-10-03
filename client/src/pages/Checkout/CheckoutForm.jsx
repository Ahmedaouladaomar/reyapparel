import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useAxios, { POST } from "@/hooks/useAxios";
import { STRIPE } from "@/pages/routes";
import { useContext, useState } from "react";
import { CartContext } from "@/context/cart";
import { Button, Divider, Flex, Text, Title } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { Session } from "@/context/user";
import { REQUIRED_FIELD_ERROR, SOMETHING_WENT_WRONG } from "@/helpers/consts";

const CheckoutForm = () => {
  // stripe hooks
  const stripe = useStripe();
  const elements = useElements();
  // custom hook
  const { call } = useAxios(STRIPE, POST);
  // user context
  const { state } = useContext(Session);
  const { user } = state;
  // cart context
  const { cart } = useContext(CartContext);
  // address
  const [address, setAddress] = useState(null);
  // state
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [error, setError] = useState("");
  // address element options
  const addressOptions = { mode: "shipping", allowedCountries: ["EU"] };

  const handleSubmit = async (event) => {
    // cancel native submit behavior
    event.preventDefault();
    // return null if not loaded yet
    if (!stripe || !elements || !cart) return;
    try {
      // loading state
      setLoading(true);
      // validating form values
      let values = await elements.submit();
      if (values.error) {
        // error
        setError(REQUIRED_FIELD_ERROR);
        // loading state
        setLoading(false);
        return;
      }
      // fetch api
      const { state, ...rest } = address;
      let res = await call({
        body: {
          user: user,
          cart: cart,
          address: rest,
        },
      });
      if (!res) setError(SOMETHING_WENT_WRONG);
      // retrieve client secret
      const { client_secret } = res?.data;
      let clientSecret = client_secret;
      // retrieve payment intent
      const result = await stripe.confirmPayment({
        clientSecret,
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        // Show error to customer (for example, payment details incomplete)
        setError(result.error.message);
      } else {
        setPaymentStatus(result.paymentIntent.status);
      }
    } catch (err) {
      setError(result.error.message);
    } finally {
      // loading state
      setLoading(false);
    }
  };

  return (
    <>
      {paymentStatus == "succeeded" ? (
        <Flex align="center" gap={10}>
          <IconCircleCheck size={18} color="green" />
          <Text>
            Thank you, your payment succeeded, a confirmation email has been
            sent to you.
          </Text>
        </Flex>
      ) : (
        <form className="flex gap-8 max-lg:flex-col" onSubmit={handleSubmit}>
          <Flex flex={1} direction="column">
            <Title mb={30} size="h3" fw={400}>
              Shipping details
            </Title>
            <AddressElement
              onChange={(e) => setAddress(e.value.address)}
              options={addressOptions}
            />
          </Flex>

          <Divider className="hidden lg:block" c="gray" orientation="vertical" />
          <Divider className="block lg:hidden" c="gray" orientation="horizontal" />
          
          <Flex flex={1} direction="column">
            <Title mb={30} size="h3" fw={400}>
              Billing details
            </Title>
            <PaymentElement />
            <Button type="submit" mt={20} disabled={!stripe} loading={loading}>
              Submit
            </Button>
            {error && (
              <Text mt={5} size="sm" c="red">
                {error}
              </Text>
            )}
            <Text size="sm" mt={10} c="gray">
              Please never use a real bank card on this website, this is just
              for educational purposes, use instead this test card:<br></br>{" "}
              <strong>4242 4242 4242 4242</strong>
            </Text>
          </Flex>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
