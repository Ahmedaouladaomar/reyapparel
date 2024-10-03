import { Box, Card, Divider, Flex, Text, Title } from "@mantine/core";
import React from "react";
import ContactIcon, { data } from "./ContactIcon";
import { IconMapPin, IconSun } from "@tabler/icons-react";

export default function Contact() {
  return (
    <Flex className="bg-white h-[90vh] flex flex-col md:flex-row justify-center items-center gap-[20px]" px={20}>
      <Card
        className="rounded-md shadow-md w-[100%] md:w-auto"
        bg="rey-gold"
        opacity={0.8}
        c="white"
      >
        <Flex direction="column" gap={20}>
          <Title>Contact us</Title>
          <Text>
            Feel free to reach us and we will get back to you within 24 hours
          </Text>
          <Flex direction="column">
            {data.map((item, index) => (
              <ContactIcon {...item} key={index} />
            ))}
          </Flex>
        </Flex>
      </Card>
      <div className="hidden md:block" >
        <Divider orientation="vertical"  opacity={0.8} mx={8} h="200px" />
      </div>
      <Flex className="w-[100%] max-md:shadow max-md:rounded max-md:py-8 max-md:px-4 md:w-auto" direction="column" gap={10}>
        <Title order={2}>Our location</Title>
        <Flex>
          <IconMapPin />
          <Text>77 RM avenue Tangier Morocco</Text>
        </Flex>
        <Title order={5}>Working hours</Title>
        <Flex>
          <IconSun />
          <Text>8 a.m. – 11 p.m.</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
