import React, { useRef, useState } from "react";
import '../../App';
import { ProjectForm } from "../proyectos/ProjectForm";
import { SkillForm } from "../habilidades/SkillsForm";
import { Grid, GridItem, Separator, Flex, Theme, Box, IconButton, Drawer, VStack, Card, Text } from "@chakra-ui/react";
import { EducationForm } from "../educacion/EducationForm";
import { SignupForm } from "../perfil/SignupForm";
import { ContactForm } from "../contacto/ContactForm";
import { LanguageForm } from "../idiomas/LanguageForm";
import { UserImage } from "../perfil/UserImage";
import { ReferenceForm } from "../referencias/ReferenceForm";
import { ExperienceForm } from "../experience/ExperienceForm";
import { useDispatch, useSelector } from "react-redux";
import { setFinished } from "../slices/UserSlice";
import { useReactToPrint } from "react-to-print";
import { FaArrowLeft, FaFilePdf, FaPaintRoller, FaFont } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FiLayout } from "react-icons/fi";
import { ResetFormButton } from "../ResetFormButton";

export const PortafolioPreview = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    const [theme, setTheme] = useState('red');
    const [layout, setLayout] = useState('theme1');
    const [font, setFont] = useState('Roboto');

    React.useEffect(() => {
        dispatch(setFinished(true));
    })

    const contentRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        pageStyle: "A4",
        documentTitle: "Portafolio",
    });

    const forms = {
        'userImage': { element: <UserImage />, condition: false },
        'education': { element: <EducationForm />, condition: state.education.length > 0 },
        'contact': { element: <ContactForm />, condition: state.contact.length > 0 },
        'experience': { element: <ExperienceForm />, condition: state.experience.length > 0 },
        'signup': { element: <SignupForm />, condition: true },
        'skill': { element: <SkillForm />, condition: state.skills.length > 0 },
        'language': { element: <LanguageForm />, condition: state.language.length > 0 },
        'project': { element: <ProjectForm />, condition: false },
        'reference': { element: <ReferenceForm />, condition: false },
    }

    const RenderForm = ({ form }) => {
        const item = forms[form];
        return (
            <>
                {item.element}
                {item.condition && <Separator />}
            </>
        )
    }

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
    }

    const ChangeThemeButton = () => {
        return (
            <Drawer.Root>
                <Drawer.Backdrop />
                <Drawer.Trigger>
                    <IconButton rounded="full" aria-label="Generar pdf">
                        <FaPaintRoller />
                    </IconButton>
                </Drawer.Trigger>
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Title>
                                Elegir Tema
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <VStack gap="4">
                                <Theme border="" colorPalette="red" width="100%">
                                    <Card.Root width="100%" height="15vh" onClick={() => changeTheme('red')} cursor="pointer" >
                                        <Card.Body>
                                            <Box bg="red.fg" width="100%" height="70%" />
                                            <Card.Title>
                                                Predeterminado
                                            </Card.Title>
                                        </Card.Body>
                                    </Card.Root>
                                </Theme>
                                <Theme colorPalette="blue" width="100%">
                                    <Card.Root width="100%" height="15vh" onClick={() => changeTheme('blue')} cursor="pointer" >
                                        <Card.Body>
                                            <Box bg="blue.fg" width="100%" height="70%" />
                                            <Card.Title>
                                                Azul
                                            </Card.Title>
                                        </Card.Body>
                                    </Card.Root>
                                </Theme>
                                <Theme colorPalette="pink" width="100%">
                                    <Card.Root width="100%" height="15vh" onClick={() => changeTheme('pink')} cursor="pointer" >
                                        <Card.Body>
                                            <Box bg="pink.fg" width="100%" height="70%" />
                                            <Card.Title>
                                                Rosa
                                            </Card.Title>
                                        </Card.Body>
                                    </Card.Root>
                                </Theme>
                                <Theme colorPalette="green" width="100%">
                                    <Card.Root width="100%" height="15vh" onClick={() => changeTheme('green')} cursor="pointer" >
                                        <Card.Body>
                                            <Box bg="green.fg" width="100%" height="70%" />
                                            <Card.Title>
                                                Verde
                                            </Card.Title>
                                        </Card.Body>
                                    </Card.Root>
                                </Theme>
                            </VStack>
                        </Drawer.Body>
                        <Drawer.Footer />
                    </Drawer.Content>
                </Drawer.Positioner>
            </Drawer.Root>
        )
    }

    const ChangeFontButton = () => {
        return (
            <Drawer.Root>
                <Drawer.Backdrop />
                <Drawer.Trigger>
                    <IconButton rounded="full" aria-label="Generar pdf">
                        <FaFont />
                    </IconButton>
                </Drawer.Trigger>
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Title>
                                Elegir Fuente
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <VStack gap="4">
                                <Card.Root width="100%" onClick={() => setFont('Inter')} cursor="pointer" >
                                    <Card.Body>
                                        <Text fontSize="3xl" fontFamily="Inter">Predeterminado</Text>
                                    </Card.Body>
                                </Card.Root>
                                <Card.Root width="100%" onClick={() => setFont('Roboto')} cursor="pointer" >
                                    <Card.Body>
                                        <Text fontSize="3xl" fontFamily="Roboto">Roboto</Text>
                                    </Card.Body>
                                </Card.Root>
                                <Card.Root width="100%" onClick={() => setFont("'Montserrat', sans-serif")} cursor="pointer" >
                                    <Card.Body>
                                        <Text fontSize="3xl" fontFamily="'Montserrat', sans-serif">Montserrat</Text>
                                    </Card.Body>
                                </Card.Root>
                                <Card.Root width="100%" onClick={() => setFont("'Playwrite AU SA', cursive")} cursor="pointer" >
                                    <Card.Body>
                                        <Text fontSize="3xl" fontFamily="'Playwrite AU SA', cursive">Playwrite</Text>
                                    </Card.Body>
                                </Card.Root>
                            </VStack>
                        </Drawer.Body>
                        <Drawer.Footer />
                    </Drawer.Content>
                </Drawer.Positioner>
            </Drawer.Root>
        )
    }

    const ChangeLayoutButton = () => {
        return (
            <Drawer.Root>
                <Drawer.Backdrop />
                <Drawer.Trigger>
                    <IconButton rounded="full" aria-label="Generar pdf">
                        <FiLayout />
                    </IconButton>
                </Drawer.Trigger>
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Title>
                                Elegir Distribución
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <VStack gap="4">
                                <Card.Root width="100%" height="15vh" onClick={() => setLayout('theme1')} cursor="pointer" >
                                    <Card.Body>
                                        <Card.Title fontStyle="theme1">
                                            Predeterminado
                                        </Card.Title>
                                        <Card.Description>
                                            Dos columnas, una fila
                                        </Card.Description>
                                    </Card.Body>
                                </Card.Root>
                                <Card.Root width="100%" height="15vh" onClick={() => setLayout('theme2')} cursor="pointer" >
                                    <Card.Body>
                                        <Card.Title>
                                            Alternativo
                                        </Card.Title>
                                        <Card.Description>
                                            Tres filas, dos columnas arriba, 3 abajo
                                        </Card.Description>
                                    </Card.Body>
                                </Card.Root>
                            </VStack>
                        </Drawer.Body>
                        <Drawer.Footer />
                    </Drawer.Content>
                </Drawer.Positioner>
            </Drawer.Root>
        )
    }

    const Theme1 = () => {
        return (
            <Theme colorPalette={theme} fontFamily={font}>
                <Grid templateRows="repeat(1, 1fr)"
                    templateColumns="repeat(4, 1fr)"
                    gap={5}>
                    <GridItem rowSpan={1} colSpan={4}>
                        <Flex justify="space-between" bg="gray.50" rounded="lg" _dark={{
                            bg: "gray.900"
                        }} p="4" gap={5}>
                            <RenderForm form="userImage" />
                            <RenderForm form="signup" />
                            <RenderForm form="contact" />
                        </Flex>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={2} >
                        <Flex justify="space-around" bg="gray.50" minH="18vh" rounded="lg" _dark={{
                            bg: "gray.900"
                        }} p="4" gap={5}>
                            <RenderForm form="skill" />
                            <RenderForm form="language" />
                        </Flex>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={2} height="fit-content">
                        <Flex bg="gray.50" minH="18vh" rounded="lg" _dark={{
                            bg: "gray.900"
                        }} p="4" gap="3" justify="space-around">
                            <RenderForm form="education" />
                            <RenderForm form="experience" />
                        </Flex>
                    </GridItem>
                    <GridItem bg="gray.50" rounded="lg" _dark={{
                        bg: "gray.900"
                    }} p="4" rowSpan={1} colSpan={4}>
                        <RenderForm form="project" />
                    </GridItem>
                    <GridItem bg="gray.50" rounded="lg" _dark={{
                        bg: "gray.900"
                    }} p="4" rowSpan={1} colSpan={4}>
                        <RenderForm form="reference" />
                    </GridItem>
                </Grid>
            </Theme>
        )
    }

    const Theme2 = () => {
        return (
            <Theme colorPalette={theme} fontFamily={font}>
                <Grid templateRows="repeat(1, 1fr)"
                    templateColumns="repeat(4, 1fr)"
                    gap={5}>
                    <GridItem bg="gray.50" rounded="lg" _dark={{
                        bg: "gray.900"
                    }} p="4" rowSpan={1} colSpan={1} height="fit-content">
                        <Flex direction="column" gap="3">

                        </Flex>
                    </GridItem>
                    <GridItem bg="gray.50" rounded="lg" _dark={{
                        bg: "gray.900"
                    }} p="4" rowSpan={1} colSpan={4} height="fit-content">
                        <Flex justify="space-between" gap="3">
                            <RenderForm form="userImage" />
                            <RenderForm form="signup" />
                            <RenderForm form="contact" />
                        </Flex>
                    </GridItem>
                    <GridItem bg="gray.50" rounded="lg" _dark={{
                        bg: "gray.900"
                    }} p="4" rowSpan={1} colSpan={4}>
                        <Flex justify="space-around">
                            <RenderForm form="education" />
                            <RenderForm form="experience" />
                        </Flex>
                    </GridItem>
                    <GridItem bg="gray.50" rounded="lg" _dark={{
                        bg: "gray.900"
                    }} p="4" rowSpan={1} colSpan={2}>
                        <Flex direction="column" gap={5}>
                            <RenderForm form="language" />
                            <RenderForm form="project" />
                        </Flex>
                    </GridItem>
                    <GridItem bg="gray.50" rounded="lg" _dark={{
                        bg: "gray.900"
                    }} p="4" rowSpan={1} colSpan={2}>
                        <Flex direction="column" gap={5}>
                            <RenderForm form="skill" />
                            <RenderForm form="reference" />
                        </Flex>
                    </GridItem>

                </Grid>
            </Theme>
        )
    }

    const layouts = {
        'theme1': <Theme1 />,
        'theme2': <Theme2 />
    }

    const RenderLayout = () => {
        return layouts[layout];
    }

    return (
        <>
            <Flex justify="end" mb="3" gap="4">
                <IconButton rounded="full" onClick={() => navigate('/Forms')} aria-label="Generar pdf">
                    <FaArrowLeft />
                </IconButton>
                <ChangeThemeButton />
                <ChangeFontButton />
                <ChangeLayoutButton />
                <IconButton rounded="full" onClick={handlePrint} aria-label="Generar pdf">
                    <FaFilePdf />
                </IconButton>
                <ResetFormButton />
            </Flex>
            <Box ref={contentRef}>
                <RenderLayout />
            </Box>
        </>
    )
}