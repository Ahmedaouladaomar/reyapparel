import LoginForm from "./Forms";
import { Card, Center, Flex, Title } from "@mantine/core";
import classes from "./styles.module.css";

function Login({ toggle }) {
    return (
        <Center w="100%">
            <Card className={classes.card} mx="auto" shadow="sm" padding="lg" withBorder>
                <Center>
                    <Flex direction='column' align='center' gap={30}>
                        <Title order={2}>Login</Title>
                    </Flex>
                </Center>
                <LoginForm toggle={toggle} />
            </Card>
        </Center>
    );
}

export default Login;