import { useState, useEffect } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";

import { Dialog, Field, Fieldset, CloseButton, Portal, Button, Container, Input, Group, For, Heading, Textarea, Card, Wrap, Blockquote } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

import { addReference, removeReference, replaceReference } from '../slices/ReferenceSlice';
import { add, reduce } from '../slices/CompletitionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isEditable } from "../slices/UserSlice";

export const ReferenceForm = () => {
    const references = useSelector((state) => state.reference);
    const dispatch = useDispatch();
    const editable = useSelector(isEditable);

    const [editIndex, setEditIndex] = useState(-1);
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            referencia: '',
            familiaridad: '',
            testimonio: ''
        },
        validationSchema: Yup.object({
            referencia: Yup
                .string()
                .required('Requerido'),
            familiaridad: Yup
                .string()
                .required('Requerido'),
            testimonio: Yup
                .string()
                .required('Requerido'),
        }),
        onSubmit: values => {
            if (editIndex === -1) {
                dispatch(addReference(values));
                reset();
            } else {
                dispatch(replaceReference({ item: values, index: editIndex }))
            }
        },
    })

    const reset = () => {
        formik.resetForm();
        setEditIndex(-1);

        if (!editable) {
            window.history.replaceState(null, null, "/preview")
        }
    }

    const editReference = (item, index) => {
        setOpen(true);
        formik.setValues(item);
        setEditIndex(index);

        if (!editable) {
            window.history.replaceState(null, null, "/edit/reference")
        }
    }

    const remove = (index) => {
        dispatch(removeReference(index));
    }

    const AutoSubmit = () => {
        const { isValid, touched } = formik;

        useEffect(() => {
            if (references.length > 0) {
                dispatch(add('ReferenceForm'))
            } else {
                dispatch(reduce('ReferenceForm'));
            }
        }, [isValid, touched])
        return null;
    }

    const ListReferences = () => {
        return (
            <Wrap p="2" align="start" gap="0.75rem">
                <For each={references}>
                    {(item, index) => (
                        <Card.Root width="320px" key={"ReferenceC" + index}>
                            <Card.Body onClick={() => editReference(item, index)} gap="2">
                                <Card.Title mt="2">{item.familiaridad}</Card.Title>
                                <Blockquote.Root>
                                    <Blockquote.Content>
                                        {item.testimonio}
                                    </Blockquote.Content>
                                    <Blockquote.Caption>
                                        <cite>{item.referencia}</cite>
                                    </Blockquote.Caption>
                                </Blockquote.Root>
                            </Card.Body>
                            {
                                editable && (<Card.Footer justifyContent="end">
                                    <Button variant="outline" onClick={() => remove(index)}>Borrar</Button>
                                </Card.Footer>)
                            }
                        </Card.Root>
                    )}
                </For>
            </Wrap>
        );
    }

    if (editable || references.length > 0) {
        return (
            <div>
                <AutoSubmit />
                <Heading my="2">Referencias</Heading>
                <ListReferences />
                <Dialog.Root lazyMount open={open} mt="2" closeOnEscape={true} onOpenChange={(e) => { setOpen(e.open); reset(); }} size="xl" placement="center"
                    motionPreset="slide-in-bottom">
                    {
                        editable && (
                            <Dialog.Trigger asChild>
                                <Button variant="ghost" rounded="full">
                                    <LuPlus />
                                </Button>
                            </Dialog.Trigger>
                        )
                    }
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <form onSubmit={formik.handleSubmit}>
                                    <Dialog.Header>
                                        <Dialog.Title>Nueva referencia</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <Container>
                                            <Fieldset.Root>
                                                <Fieldset.Content>
                                                    <Group>
                                                        <Field.Root invalid={formik.touched.referencia && Boolean(formik.errors.referencia)}>
                                                            <Field.Label>Referencia</Field.Label>
                                                            <Input value={formik.values.referencia} onChange={formik.handleChange} onBlur={formik.handleBlur} name="referencia" />
                                                            <Field.ErrorText>{formik.errors.referencias}</Field.ErrorText>
                                                        </Field.Root>

                                                        <Field.Root invalid={formik.touched.familiaridad && Boolean(formik.errors.familiaridad)}>
                                                            <Field.Label>Familiaridad</Field.Label>
                                                            <Input value={formik.values.familiaridad} onChange={formik.handleChange} onBlur={formik.handleBlur} name="familiaridad" />
                                                            <Field.ErrorText>{formik.errors.familiaridad}</Field.ErrorText>
                                                        </Field.Root>
                                                    </Group>

                                                    <Field.Root invalid={formik.touched.testimonio && Boolean(formik.errors.testimonio)}>
                                                        <Field.Label>Testimonio</Field.Label>
                                                        <Textarea name="testimonio" value={formik.values.testimonio} onChange={formik.handleChange} onBlur={formik.handleBlur} maxLength={150} rows={3}></Textarea>
                                                        <Field.ErrorText>{formik.errors.testimonio}</Field.ErrorText>
                                                    </Field.Root>
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