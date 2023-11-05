import {
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Title,
  Paper,
} from "@mantine/core";
import { ActionTypes } from ".";
import { Form } from "react-router-dom";

const Register = ({ dispatch }: { dispatch: React.Dispatch<ActionTypes> }) => {
  return (
    <>
      <Title align="center">Join Journey Junkies</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form method="POST" action="/register">
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              name="name"
              radius="md"
            />
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              name="email"
              type="email"
              radius="md"
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              name="password"
              radius="md"
            />
            <Checkbox
              label="I accept terms and conditions"
              required
              name="terms"
            />
            <Button type="submit" radius="md" fullWidth mt="xl">
              Register
            </Button>

            <Anchor
              component="button"
              type="button"
              color="dimmed"
              size="xs"
              ta="center"
              mt="md"
              onClick={() => dispatch(ActionTypes.SET_LOGIN)}
            >
              Already have an account? Login
            </Anchor>
          </Stack>
        </Form>
      </Paper>
    </>
  );
};

export default Register;
