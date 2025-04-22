import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Field, Fieldset, For, HStack, Input, Portal, Button, Card, NativeSelect, Tag, CloseButton, Container, Group, FileUpload, Box, Icon, Flex, Float, Wrap, Link, Separator, Heading, Image } from "@chakra-ui/react";
import { LuExternalLink, LuUpload } from "react-icons/lu"
import { addProject, removeProject } from '../slices/ProjectsSlice';

import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import "yet-another-react-lightbox/styles.css";
import { add, reduce } from '../slices/CompletitionSlice';
import { isEditable } from "../slices/UserSlice";

export const ProjectForm = () => {
    const [open, setOpen] = useState(false)
    const [tecnoSeleccionada, setTecnoSeleccionada] = useState('');
    const [tecnologias, setTecnologias] = useState([]);
    const [files, setFiles] = useState([]);
    const [openLightbox, setOpenLightbox] = useState(false);
    const editable = useSelector(isEditable);

    const newProjects = useSelector((state) => state.projects);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            nombreProyecto: '',
            descripcion: '',
            tecnologiasUsadas: [],
            enlace: '',
            capturas: []
        },
        validationSchema: Yup.object({
            nombreProyecto: Yup
                .string()
                .max(50, 'Debe tener máximo 50 caracteres')
                .required('Requerido'),
            descripcion: Yup
                .string()
                .required('Requerido'),
            tecnologiasUsadas: Yup
                .array()
                .of(Yup.string()),
            enlace: Yup.string().url('Debe ser una URL valida').notRequired(),
            capturas: Yup
                .array()
                .of(Yup.string()),
        }),
        onSubmit: values => {
            dispatch(addProject(values));
            formik.resetForm();
            setTecnologias([]);
            setFiles([]);
        }
    })

    const agregarTecnologia = (e) => {
        if (tecnologias && !tecnologias.includes(tecnoSeleccionada) && tecnoSeleccionada && tecnoSeleccionada !== "") {
            const cpy = [...tecnologias, tecnoSeleccionada];
            formik.setFieldValue('tecnologiasUsadas', cpy);
            setTecnologias(cpy);
        }
    }

    const eliminarTecnologias = index => {
        const cpy = [...tecnologias];
        cpy.splice(index, 1)
        setTecnologias(cpy);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const cargarImagen = (filesDetails) => {
        const base64Images = [];
        setFiles(filesDetails.acceptedFiles);
        filesDetails.acceptedFiles.forEach(async (x, index) => {
            let temp = await toBase64(x);
            base64Images.push(temp);

            if (index === filesDetails.acceptedFiles.length - 1) {
                formik.setFieldValue('capturas', base64Images);
            }
        });
    }

    const borrarProyecto = (index) => {
        dispatch(removeProject(index));
    }

    const openImage = () => {
        setOpenLightbox(true);
    }

    const ListProyects = () => {
        return (
            <Wrap my="3">
                <For each={newProjects ?? []}>
                    {(item, index) => (
                        <Card.Root key={index} width="500px" height="500px" aspectRatio="square" _hover={{
                            borderColor: "blue.subtle"
                        }}>
                            {
                                editable && (
                                    <Card.Header width="100%" height={"100%"}>
                                        <Lightbox
                                            plugins={[Inline]}
                                            carousel={{
                                                padding: 0,
                                                spacing: 0,
                                                imageFit: "contain",

                                            }}
                                            inline={{
                                                style: {
                                                    width: "100%",
                                                    aspectRatio: "3 / 2 ",
                                                    margin: "0 auto",
                                                    fit: "contain"
                                                },
                                            }}
                                            open={openLightbox}
                                            on={{
                                                click: openImage
                                            }}
                                            slides={item.capturas.map(x => { return { src: x } })}
                                            controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
                                        />
                                    </Card.Header>
                                )
                            }
                            {
                                !editable &&
                                (
                                    <Card.Header mb="2">
                                        <Image fit="contain" objectFit="contain" aspectRatio="3 / 2" src={item.capturas[0]} />
                                    </Card.Header>
                                )
                            }
                            <Card.Body p="3">
                                <Group>
                                    <Box>

                                        <Card.Title>{item.nombreProyecto}</Card.Title>
                                        <Card.Description>
                                            {item.descripcion}
                                            <Separator />
                                            {item.enlace && (
                                                <Link href={item.enlace} >
                                                    {item.enlace} <LuExternalLink />
                                                </Link>
                                            )}
                                        </Card.Description>
                                    </Box>
                                </Group>

                            </Card.Body>
                            <Card.Footer justifyContent="space-between">

                                <Wrap>
                                    <For each={item.tecnologiasUsadas}>
                                        {(item, index) => (
                                            <Tag.Root key={index}>
                                                <Tag.Label>{item}</Tag.Label>
                                            </Tag.Root>
                                        )}
                                    </For>
                                </Wrap>
                                {editable && <Button variant="outline" onClick={() => borrarProyecto(index)}>Borrar</Button>}
                            </Card.Footer>
                        </Card.Root>
                    )}
                </For>
            </Wrap>);
    }

    const AutoSubmit = () => {
        const { isValid, touched } = formik;

        useEffect(() => {
            if (newProjects.length > 0) {
                dispatch(add('ProjectForm'))
            } else {
                dispatch(reduce('ProjectForm'));
            }
        }, [isValid, touched])
        return null;
    }

    if (editable || newProjects.length > 0) {
        return (
            <div>
                <AutoSubmit />
                <Heading my="2">Proyectos</Heading>
                <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} size="xl" placement="center"
                    motionPreset="slide-in-bottom">
                    {
                        editable && (
                            <Dialog.Trigger asChild>
                                <Button variant="outline">Nuevo proyecto</Button>
                            </Dialog.Trigger>
                        )
                    }
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <form onSubmit={formik.handleSubmit}>
                                    <Dialog.Header>
                                        <Dialog.Title>Nuevo proyecto</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <Container>
                                            <Flex gap="4" justify="space-between">
                                                <Fieldset.Root>
                                                    <Fieldset.Content>
                                                        <Field.Root invalid={formik.touched.nombreProyecto && Boolean(formik.errors.nombreProyecto)}>
                                                            <Field.Label>Nombre proyecto</Field.Label>
                                                            <Input name="nombreProyecto"
                                                                value={formik.values.nombreProyecto}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} />
                                                            <Field.ErrorText>{formik.errors.nombreProyecto}</Field.ErrorText>
                                                        </Field.Root>

                                                        <Field.Root invalid={formik.touched.descripcion && Boolean(formik.errors.descripcion)}>
                                                            <Field.Label>Descripción</Field.Label>
                                                            <Input name="descripcion" value={formik.values.descripcion}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} />
                                                            <Field.ErrorText>{formik.errors.descripcion}</Field.ErrorText>
                                                        </Field.Root>

                                                        <Group>
                                                            <Field.Root>
                                                                <Field.Label>Tecnologias usadas</Field.Label>
                                                                <NativeSelect.Root>
                                                                    <NativeSelect.Field value={tecnoSeleccionada} onChange={(e) => setTecnoSeleccionada(e.currentTarget.value)}>
                                                                        <For each={["", "React", "Vue", "Angular"]}>
                                                                            {(item) => (
                                                                                <option key={item} value={item}>
                                                                                    {item}
                                                                                </option>
                                                                            )}
                                                                        </For>
                                                                    </NativeSelect.Field>
                                                                    <NativeSelect.Indicator />
                                                                </NativeSelect.Root>
                                                            </Field.Root>
                                                            <Button onClick={agregarTecnologia}>
                                                                Añadir
                                                            </Button>
                                                        </Group>

                                                        <Field.Root invalid={formik.touched.enlace && Boolean(formik.errors.enlace)}>
                                                            <Field.Label>Enlace (URL)</Field.Label>
                                                            <Input name="enlace"
                                                                value={formik.values.enlace}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} />
                                                            <Field.ErrorText>{formik.errors.enlace}</Field.ErrorText>
                                                        </Field.Root>
                                                    </Fieldset.Content>

                                                    <HStack>
                                                        <For each={tecnologias}>
                                                            {(item, index) => (
                                                                <Tag.Root key={index}>
                                                                    <Tag.Label>{item}</Tag.Label>
                                                                    <Tag.EndElement>
                                                                        <Tag.CloseTrigger onClick={() => eliminarTecnologias(index)} />
                                                                    </Tag.EndElement>
                                                                </Tag.Root>
                                                            )}
                                                        </For>
                                                    </HStack>
                                                </Fieldset.Root>

                                                <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={3} accept="image/*" onFileChange={cargarImagen} allowDrop={true}>
                                                    <FileUpload.HiddenInput />
                                                    <FileUpload.Dropzone maxH="full">
                                                        <Icon size="md" color="fg.muted">
                                                            <LuUpload />
                                                        </Icon>
                                                        <FileUpload.DropzoneContent>
                                                            <Box>Cargar imagenes</Box>
                                                            <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                                                        </FileUpload.DropzoneContent>
                                                    </FileUpload.Dropzone>
                                                    <HStack>
                                                        {files.map((file) => (
                                                            <FileUpload.Item w="auto" key={file.name} file={file} boxSize={20} p={2} >
                                                                <FileUpload.ItemPreviewImage />
                                                                <Float placement="top-end">
                                                                    <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
                                                                        X
                                                                    </FileUpload.ItemDeleteTrigger>
                                                                </Float>
                                                            </FileUpload.Item>
                                                        ))}
                                                    </HStack>
                                                </FileUpload.Root>
                                            </Flex>
                                        </Container>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </Dialog.ActionTrigger>
                                        <Button type="submit" alignSelf="flex-start">
                                            Agregar proyecto
                                        </Button>
                                    </Dialog.Footer>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                </form>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root >
                <ListProyects />
            </div>
        );
    }
}