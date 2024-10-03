import { Box, Card, Divider, Flex, Text, Title } from "@mantine/core";
import React from "react";
import { IconMapPin, IconSun } from "@tabler/icons-react";

export default function About() {
  return (
    <Flex
      className="bg-white h-[90vh] flex flex-col md:flex-row justify-center items-center gap-[20px]"
      px={20}
    >
      <Title>About us</Title>
      <div className="hidden md:block">
        <Divider orientation="vertical" opacity={0.8} mx={8} h="200px" />
      </div>
      <Flex
        className="w-[100%] max-md:shadow max-md:rounded max-md:py-8 max-md:px-4 md:w-auto"
        direction="column"
        gap={10}
      >
        <Text>
          Reyapparel is a made-with-love brand,<br></br> from people to people, designed
          for <br></br>the manhood and elegant men
        </Text>
      </Flex>
    </Flex>
  );
}
