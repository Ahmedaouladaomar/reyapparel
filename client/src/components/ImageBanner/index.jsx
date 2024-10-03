import {
  Container,
  Title,
  Text,
  Button,
  BackgroundImage,
  Anchor,
} from "@mantine/core";
import classes from "./styles.module.css";

export const defaulSrcBanner =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8&auto=format&fit=crop&w=1080&q=80";

export function ImageBanner({
  title1,
  title2,
  title3,
  bg,
  description,
  position,
  src,
  label,
  color,
  href,
}) {
  return (
    <div
      className={classes.root}
      style={{
        backgroundImage:
          "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(" +
          defaulSrcBanner +
          ")",
      }}
    >
      <BackgroundImage py="xl" bg={bg}>
        <Container miw="100%" size="lg" m={0} px="xl">
          <div className={classes.inner}>
            <div className={`${classes.content} ${classes[position]}`}>
              <Title className={classes.title} c={color}>
                {title1}{" "}
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "yellow", to: "gold" }}
                >
                  {title2}
                </Text>{" "}
                {title3}
              </Title>

              <Text className={classes.description} mt={30} c={color}>
                {description}
              </Text>
              {label && href && (
                <Anchor href={href}>
                  <Button size="xl" mt={40} c={color}>
                    {label}
                  </Button>
                </Anchor>
              )}
            </div>
          </div>
        </Container>
      </BackgroundImage>
    </div>
  );
}
