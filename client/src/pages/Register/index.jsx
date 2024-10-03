import RegisterForm from "./Forms";
import { Card, Center, Flex, Title } from "@mantine/core";
import classes from "./styles.module.css";

function Register({ toggle }) {
    return (
        <Center w="100%">
            <Card className={classes.card}  mx="auto" shadow="sm" padding="lg" radius="md" withBorder>
                <Center>
                    <Flex direction='column' align='center' gap={30}>
                        <Title order={2}>Register</Title>
                    </Flex>
                </Center>
                <RegisterForm toggle={toggle} />
            </Card>
        </Center>
    );
}

export default Register;