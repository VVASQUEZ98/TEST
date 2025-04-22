import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, HStack, Link as ChakraLink, Group, Icon } from '@chakra-ui/react';
import { ColorModeButton } from "./ui/color-mode"
import { MdLabelImportant } from "react-icons/md";

function Navbar() {
    return (
        <Box bg={{ _light: "gray.200", _dark: "gray.950" }} py="5" m="0" top="0" position="sticky" zIndex="max" overflow="hidden" width="100%">
            <nav>
                <Flex justifyContent="space-around">
                    <Group>
                        <Icon size="xl">
                            <MdLabelImportant/>
                        </Icon>
                        <Heading> Grupo #6
                        </Heading>
                    </Group>
                    <HStack>
                        <ChakraLink asChild>
                            <Link to='/' >
                                Home
                            </Link>
                        </ChakraLink>
                        <ChakraLink asChild>
                            <Link to='/Forms' >
                                Creación de expediente
                            </Link>
                        </ChakraLink>
                        <ColorModeButton />
                    </HStack>
                </Flex>
            </nav>
        </Box>
    );
}

export default Navbar;