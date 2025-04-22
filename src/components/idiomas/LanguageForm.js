import { useState, useEffect } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";

import { Dialog, Field, Fieldset, CloseButton, Portal, Button, Container, Input, Group, For, Heading, Select, createListCollection, HStack, SelectValueText, Wrap, Tag, Box } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

import { addLanguage, replaceLanguage, removeLanguage } from '../slices/LanguageSlice';
import { add, reduce } from '../slices/CompletitionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isEditable } from "../slices/UserSlice";

export const LanguageForm = () => {
    const languages = useSelector((state) => state.language);
    const dispatch = useDispatch();

    const editable = useSelector(isEditable);

    const [editIndex, setEditIndex] = useState(-1);
    const [proficiency, setProficiency] = useState('');
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            language: '',
            proficiency: ''
        },
        validationSchema: Yup.object({
            language: Yup
                .string()
                .required('Requerido'),
            proficiency: Yup
                .string()
                .required('Requerido')
        }),
        onSubmit: values => {
            if (editIndex === -1) {
                dispatch(addLanguage(values));
                reset();
            } else {
                dispatch(replaceLanguage({ item: values, index: editIndex }));
            }
        },
    })

    const editLanguage = (item, index) => {
        setEditIndex(index);
        formik.setValues(item);
        changeProficiency({ value: [item.proficiency] })
        setOpen(true);

        if (!editable) {
            window.history.replaceState(null, null, "/edit/language")
        }
    }

    const remove = (e, index) => {
        e.preventDefault();
        dispatch(removeLanguage(index))
    }

    const ListLanguages = () => {
        return (
            <Wrap py="2">
                <For each={languages ?? []}>
                    {(item, index) => (
                        <Group key={'LanguageTag' + index} attached>
                            <Tag.Root rounded="full" roundedRight={editable ? "none" : "full"} p="2" pr={editable ? "2" : "4"} height="35px">
                                <Tag.StartElement>
                                    <Box p="2" />
                                </Tag.StartElement>
                                <Group onClick={() => editLanguage(item, index)}>
                                    <Tag.Label>{item.language} - {item.proficiency}</Tag.Label>
                                </Group>
                            </Tag.Root>

                            {editable &&
                                (
                                    <CloseButton onClick={remove} bg="red.muted" roundedRight="full" height="35px" _hover={{
                                        bg: "red.emphasized",
                                    }} />
                                )
                            }
                        </Group>
                    )}
                </For>
            </Wrap>
        );
    }

    const reset = () => {
        formik.resetForm();
        setEditIndex(-1);
        changeProficiency({ value: [""] })
        
        if (!editable) {
            window.history.replaceState(null, null, "/preview")
        }
    }

    const AutoSubmit = () => {
        const { isValid, touched } = formik;

        useEffect(() => {
            if (languages.length > 0) {
                dispatch(add('LanguageForm'))
            } else {
                dispatch(reduce('LanguageForm'));
            }
        }, [isValid, touched])
        return null;
    }

    const changeProficiency = (e) => {
        formik.setFieldValue('proficiency', e.value[0]);
        setProficiency(e.value);
    }

    const proficiencyList = createListCollection({
        items: [
            { label: "", value: "" },
            { label: "Básico", value: "basico" },
            { label: "Intermedio", value: "intermedio" },
            { label: "Avanzado", value: "avanzado" },
            { label: "Nativo", value: "nativo" }
        ],
    });

    if (editable || languages.length > 0) {
        return (
            <div>
                <AutoSubmit />
                <Heading my="2">Idiomas</Heading>
                <ListLanguages />
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
                                        <Dialog.Title>Nuevo idioma</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <Container>
                                            <Fieldset.Root>
                                                <Fieldset.Content>
                                                    <Group>
                                                        <Field.Root invalid={formik.touched.language && Boolean(formik.errors.language)}>
                                                            <Field.Label>Idioma</Field.Label>
                                                            <Input name="language" value={formik.values.language} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                            <Field.ErrorText>{formik.errors.language}</Field.ErrorText>
                                                        </Field.Root>

                                                        <Select.Root name="proficiency" invalid={formik.touched.proficiency && Boolean(formik.errors.proficiency)} value={proficiency} onValueChange={changeProficiency} collection={proficiencyList}>
                                                            <Select.HiddenSelect />
                                                            <Select.Label>Nivel</Select.Label>
                                                            <Select.Control>
                                                                <Select.Trigger>
                                                                    <SelectValueText />
                                                                </Select.Trigger>
                                                                <Select.IndicatorGroup>
                                                                    <Select.Indicator />
                                                                </Select.IndicatorGroup>
                                                            </Select.Control>
                                                            <Select.Positioner>
                                                                <Select.Content>
                                                                    {proficiencyList.items.map((framework) => (
                                                                        <Select.Item item={framework} key={framework.value}>
                                                                            <HStack>
                                                                                {framework.label}
                                                                            </HStack>
                                                                            <Select.ItemIndicator />
                                                                        </Select.Item>
                                                                    ))}
                                                                </Select.Content>
                                                            </Select.Positioner>
                                                        </Select.Root>
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