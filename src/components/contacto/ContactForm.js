import { useState, useEffect } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";

import { Dialog, Field, Fieldset, CloseButton, Portal, Button, Container, Input, Group, For, Text, Heading, Select, createListCollection, useSelectContext, HStack, VStack, Link, Box, Icon } from "@chakra-ui/react";
import { LuExternalLink, LuPlus } from "react-icons/lu";

import { addContact, removeContact, replaceContact } from '../slices/ContactSlice';
import { add, reduce } from '../slices/CompletitionSlice';
import { useDispatch, useSelector } from 'react-redux';

import { FaXTwitter, FaFacebook, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa6";
import { isEditable } from "../slices/UserSlice";


export const ContactForm = () => {
    const contacts = useSelector((state) => state.contact);
    const dispatch = useDispatch();

    const [editIndex, setEditIndex] = useState(-1);
    const [category, setCategory] = useState('');
    const [open, setOpen] = useState(false);
    const editable = useSelector(isEditable);

    const formik = useFormik({
        initialValues: {
            categoria: '',
            url: ''
        },
        validationSchema: Yup.object({
            categoria: Yup
                .string()
                .required('Requerido'),
            url: Yup
                .string()
                .url()
                .matches(RegExp(`http[s]?:+\\/\\/(www\\.)?${category ?? '\\w{999}'}\\.\\w{2,4}\\/\\w+`), { message: 'El url debe pertenecer a la a la pagina de contacto elegida' })
                .required('Requerido')
        }),
        onSubmit: values => {
            let icono = items.items.find(x => x.value === values.categoria);
            icono.icono = null;
            const newValues = { ...icono, url: values.url };
            if (editIndex === -1) {

                dispatch(addContact(newValues));
                reset();
            } else {
                dispatch(replaceContact({ item: newValues, index: editIndex }));
            }
        },
    })

    const reset = () => {
        formik.resetForm();
        setEditIndex(-1);
        changeCategory({ value: [''] });
    }

    const AutoSubmit = () => {
        const { isValid, touched } = formik;

        useEffect(() => {
            if (contacts.length > 0) {
                dispatch(add('ContactForm'))
            } else {
                dispatch(reduce('ContactForm'));
            }
        }, [isValid, touched])
        return null;
    }

    const SelectValue = () => {
        const select = useSelectContext();
        const item = select.selectedItems[0];
        return (
            <Select.ValueText placeholder="Select member">
                <HStack>
                    {item?.icono()}
                    {item?.label}
                </HStack>
            </Select.ValueText>
        )
    }

    const editContact = (item, index) => {
        console.log(item);

        setEditIndex(index);
        formik.setFieldValue('url', item.url)
        changeCategory({ value: [item.value] });
        setOpen(true);
    }

    const changeCategory = (e) => {
        formik.setFieldValue('categoria', e.value[0]).then(function () {
            formik.validateField('url');
            setCategory(e.value);
        });

    }

    const getIcon = (value) => {
        try {
            return items.items.find(x => x.value === value).icono()
        } catch (ex) {
            return null;
        }
    }

    const items = createListCollection({
        items: [
            { label: "", value: "", icono: () => null },
            { label: "Linkedin", value: "linkedin", icono: () => <FaLinkedin /> },
            { label: "Facebook", value: "facebook", icono: () => <FaFacebook /> },
            { label: "Github", value: "github", icono: () => <FaGithub /> },
            { label: "Twitter (X)", value: "x", icono: () => <FaXTwitter /> },
            { label: "Instagram", value: "instagram", icono: () => <FaInstagram /> },
        ],
    })

    const remove = (index) => {
        dispatch(removeContact(index));
    }

    const ListContacts = () => {
        return (
            <VStack p="2" align="start" gap="0.75rem">
                <For each={contacts}>
                    {(item, index) => (
                        <Group key={"Contact" + index}>
                            <Group onClick={() => editContact(item, index)}>
                                <Icon>
                                    {getIcon(item.value)}
                                </Icon>
                                <Text>
                                    {item.label}
                                    <span>
                                        <Text fontSize="sm">
                                            {item.url}
                                        </Text>
                                    </span>
                                </Text>
                            </Group>
                            <Link href={item.url} key={"ContactG-" + index}>
                                <LuExternalLink />
                            </Link>
                            {editable && <CloseButton onClick={() => remove(index)} />}
                        </Group>
                    )}
                </For>
            </VStack>
        );
    }

    if (editable || contacts.length > 0) {
        return (
            <div>
                <AutoSubmit />
                <Heading my="2">Contacto</Heading>
                <ListContacts />
                <Dialog.Root lazyMount open={open} mt="2" closeOnEscape={true} onOpenChange={(e) => { setOpen(e.open); reset(); }} size="xl" placement="center"
                    motionPreset="slide-in-bottom">
                    {
                        editable && (<Dialog.Trigger asChild>
                            <Button variant="ghost" rounded="full">
                                <LuPlus />
                            </Button>
                        </Dialog.Trigger>)
                    }
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <form onSubmit={formik.handleSubmit}>
                                    <Dialog.Header>
                                        <Dialog.Title>Nuevo contacto</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <Container>
                                            <Fieldset.Root>
                                                <Fieldset.Content>
                                                    <Group>
                                                        <Field.Root>
                                                            <Select.Root name="categoria" value={category} onValueChange={changeCategory} collection={items}>
                                                                <Select.HiddenSelect />
                                                                <Select.Label>Contacto</Select.Label>
                                                                <Select.Control>
                                                                    <Select.Trigger>
                                                                        <SelectValue />
                                                                    </Select.Trigger>
                                                                    <Select.IndicatorGroup>
                                                                        <Select.Indicator />
                                                                    </Select.IndicatorGroup>
                                                                </Select.Control>
                                                                <Select.Positioner>
                                                                    <Select.Content>
                                                                        {items.items.map((framework) => (
                                                                            <Select.Item item={framework} key={framework.value}>
                                                                                <HStack>
                                                                                    {framework.icono()}
                                                                                    {framework.label}
                                                                                </HStack>
                                                                                <Select.ItemIndicator />
                                                                            </Select.Item>
                                                                        ))}
                                                                    </Select.Content>
                                                                </Select.Positioner>
                                                            </Select.Root>
                                                        </Field.Root>

                                                        <Field.Root invalid={formik.touched.url && Boolean(formik.errors.url)}>
                                                            <Field.Label>URL</Field.Label>
                                                            <Input value={formik.values.url} onChange={formik.handleChange} onBlur={formik.handleBlur} name="url" />
                                                            <Field.ErrorText>{formik.errors.url}</Field.ErrorText>
                                                        </Field.Root>
                                                    </Group>
                                                </Fieldset.Content>
                                            </Fieldset.Root>
                                        </Container>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline">Cancelar</Button>
                                        </Dialog.ActionTrigger>
                                        <Button type="submit" alignSelf="flex-start">
                                            {editIndex >= 0 ? 'Actualizar' : 'Agregar'}
                                        </Button>
                                    </Dialog.Footer>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                </form>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </div>
        )
    }
}