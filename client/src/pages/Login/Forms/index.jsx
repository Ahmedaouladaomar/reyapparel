import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Button,
  Group,
  Box,
  Anchor,
  PasswordInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useAuth from "@/hooks/useAuth";
import { useContext, useEffect } from "react";
import { HOME, REGISTER } from "@/pages/routes";
import { Session } from "@/context/user";
import { CartContext } from "@/context/cart";
import { reloadPage } from "@/helpers/window";

const initialFormData = {
  initialValues: {
    username: "",
    password: "",
  },
  validate: {
    username: (value) => (value ? null : "Invalid username"),
    password: (value) =>
      value.length >= 6 ? null : "Password must have at least 6 characters",
  },
};

function LoginForm({ toggle }) {
  // form hook
  const form = useForm(initialFormData);
  // custom hook
  const { signIn, loading, fail } = useAuth();

  return (
    <Box w="100%" mx="auto">
      <form onSubmit={form.onSubmit((values) => signIn(values, 1000))}>
        <TextInput
          withAsterisk
          label="Username"
          placeholder="username"
          mb={10}
          {...form.getInputProps("username")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="passowrd"
          type="password"
          {...form.getInputProps("password")}
        />

        {fail && <Text mt={5} size="sm" c="red"> Wrong credetials, try again </Text>}

        <Group justify="space-between" mt="md">
          <Anchor onClick={() => toggle((prev) => !prev)}>Register here</Anchor>
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default LoginForm;
