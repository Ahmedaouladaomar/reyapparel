import React from "react";
import { Box, Flex, Image, Loader } from "@mantine/core";
import Logo from "@/images/reyapparel-logo.png";
import CustomLoader from "./CustomLoader";

export default function PageLoader() {
  return (
    <Box pos="relative" h="100vh" w="100vw">
      <Flex h="100%" w="100%" justify="center" align="center">
        <Flex direction="column" align="center" gap={10}>
          <Image className="shadow" src={Logo} w={200} fit="contain" />
          <CustomLoader />
        </Flex>
      </Flex>
    </Box>
  );
}
