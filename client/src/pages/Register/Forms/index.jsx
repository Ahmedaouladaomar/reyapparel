import {
  TextInput,
  Button,
  Group,
  Box,
  Anchor,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useAuth from "@/hooks/useAuth";

const initialFormData = {
  initialValues: {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  },
  validate: {
    username: (value) => (value ? null : "Invalid username"),
    email: (value) => (value ? null : "Invalid email"),
    firstName: (value) => (value ? null : "Invalid firstname"),
    lastName: (value) => (value ? null : "Invalid lastname"),
    password: (value) =>
      value.length >= 6 ? null : "Password must have at least 6 characters",
    confirmPassword: (value, values) =>
      value && values.password === value ? null : "Passwords do not match",
  },
};

function RegisterForm({ toggle }) {
  // custom hooks call
  const form = useForm(initialFormData);
  const { loading, signUp, fail } = useAuth();

  return (
    <Box w="100%" mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          const { confirmPassword, ...result } = values;
          const body = { role: 'customer', ...result }
          signUp(body, 500);
        })}
      >
        <TextInput
          withAsterisk
          label="Username"
          placeholder="username"
          mb={10}
          {...form.getInputProps("username")}
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="email"
          {...form.getInputProps("email")}
        />

        <TextInput
          withAsterisk
          label="Firstname"
          placeholder="firstname"
          {...form.getInputProps("firstName")}
        />

        <TextInput
          withAsterisk
          label="Lastname"
          placeholder="lastname"
          {...form.getInputProps("lastName")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="password"
          type="password"
          {...form.getInputProps("password")}
        />

        <PasswordInput
          withAsterisk
          label="Confirm password"
          placeholder="confirm password"
          type="password"
          {...form.getInputProps("confirmPassword")}
        />

        {fail && (
          <Text mt={5} size="sm" c="red">
            {" "}
            Something went wrong, try again{" "}
          </Text>
        )}

        <Group justify="space-between" mt="md">
          <Anchor onClick={() => toggle((prev) => !prev)}>
            Already have an account?
          </Anchor>
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default RegisterForm;
