import { useState, useEffect } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";

import { Timeline, Dialog, Field, Fieldset, CloseButton, Portal, Button, Container, Input, Textarea, Group, For, Text, Heading, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

import { addEducation, replaceEducation, removeEducation } from '../slices/EducationSlice';
import { useDispatch, useSelector } from 'react-redux';

import { add, reduce } from '../slices/CompletitionSlice';
import { isEditable } from "../slices/UserSlice";

export const EducationForm = () => {
    const educations = useSelector((state) => state.education);
    const dispatch = useDispatch();
    const editable = useSelector(isEditable);

    const [editIndex, setEditIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [fechaInicio, setFechaInicio] = useState('');

    const currentYear = new Date().getFullYear();
    const formik = useFormik({
        initialValues: {
            institucion: '',
            grado: '',
            descripcion: '',
            fechaFin: '',
            fechaInicio: ''
        },
        validationSchema: Yup.object({
            institucion: Yup
                .string()
                .required('Requerido'),
            grado: Yup
                .string()
                .required('Requerido'),
            descripcion: Yup.string().max(255).notRequired(),
            fechaInicio: Yup
                .date()
                .required('Requerido'),
            fechaFin: Yup
                .date()
                .when("fechaInicio", (fechaInicio, schema) => {
                    if (fechaInicio && fechaInicio != '') {
                        const date = new Date(fechaInicio);
                        return schema.min(date, 'No puede ser menor que la fecha de inicio');
                    }
                    return schema;
                })
                .notRequired()
        }),
        onSubmit: values => {
            if (editIndex === -1) {
                dispatch(addEducation(values));
                formik.resetForm();
            } else {
                dispatch(replaceEducation({ item: values, index: editIndex }));
            }
        },
    })

    const editEducation = (item, index) => {
        setEditIndex(index);
        setFechaInicio(item.fechaInicio);
        formik.setValues(item);
        setOpen(true);

        if (!editable) {
            window.history.replaceState(null, null, "/edit/education")
        }
    }

    const remove = (e, index) => {
        dispatch(removeEducation(index));
    }

    const formatDate = (dateString) => {
        var date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString();
    }

    const ListEducation = () => {
        return (
            <Timeline.Root p="2">
                <For each={educations}>
                    {(item, index) => (
                        <Timeline.Item key={'Time' + index}>
                            <Timeline.Connector>
                                <Timeline.Separator />
                                <Timeline.Indicator />
                            </Timeline.Connector>
                            <VStack align="start">
                                <Timeline.Title>
                                    <Group >
                                        <Text>{item.grado}</Text>
                                        {editable && <CloseButton size="xs" onClick={() => remove(index)} />}
                                    </Group>
                                </Timeline.Title>
                                <Timeline.Content cursor="pointer" onClick={() => editEducation(item, index)} >
                                    <Timeline.Description>
                                        {item.institucion} / {formatDate(item.fechaInicio)} {item.fechaFin ? ' - ' + formatDate(item.fechaFin) : null}
                                    </Timeline.Description>
                                    <Text textStyle="sm">
                                        {item.descripcion}
                                    </Text>
                                </Timeline.Content>
                            </VStack>
                        </Timeline.Item>
                    )}
                </For>
            </Timeline.Root>
        )
    }

    const reset = () => {
        formik.resetForm();
        setEditIndex(-1);

        if (!editable) {
            window.history.replaceState(null, null, "/preview")
        }
    }

    const AutoSubmit = () => {
        const { isValid, touched } = formik;

        useEffect(() => {
            if (educations.length > 0) {
                dispatch(add('EducationForm'))
            } else {
                dispatch(reduce('EducationForm'));
            }
        }, [isValid, touched])
        return null;
    }

    if (editable || educations.length > 0) {
        return (
            <div>
                <AutoSubmit />
                <Heading my="2">Educación</Heading>
                <ListEducation />
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
                                        <Dialog.Title>Nueva educación</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <Container>
                                            <Fieldset.Root>
                                                <Fieldset.Content>
                                                    <Group>
                                                        <Field.Root invalid={formik.touched.institucion && Boolean(formik.errors.institucion)}>
                                                            <Field.Label>Institución</Field.Label>
                                                            <Input value={formik.values.institucion} onChange={formik.handleChange} onBlur={formik.handleBlur} name="institucion" />
                                                            <Field.ErrorText>{formik.errors.institucion}</Field.ErrorText>
                                                        </Field.Root>

                                                        <Field.Root invalid={formik.touched.grado && Boolean(formik.errors.grado)}>
                                                            <Field.Label>Grado</Field.Label>
                                                            <Input value={formik.values.grado} onChange={formik.handleChange} onBlur={formik.handleBlur} name="grado" />
                                                            <Field.ErrorText>{formik.errors.grado}</Field.ErrorText>
                                                        </Field.Root>
                                                    </Group>
                                                    <Field.Root invalid={formik.touched.descripcion && Boolean(formik.errors.descripcion)}>
                                                        <Field.Label>Descripción</Field.Label>
                                                        <Textarea name="descripcion" value={formik.values.descripcion} onChange={formik.handleChange} onBlur={formik.handleBlur} maxLength={150} rows={3}></Textarea>
                                                        <Field.ErrorText>{formik.errors.descripcion}</Field.ErrorText>
                                                    </Field.Root>

                                                    <Group>
                                                        <Field.Root invalid={formik.touched.fechaInicio && Boolean(formik.errors.fechaInicio)}>
                                                            <Field.Label>Fecha inicio</Field.Label>
                                                            <Input name="fechaInicio" value={formik.values.fechaInicio} onChange={(e) => {
                                                                formik.handleChange(e);
                                                                setFechaInicio(e.currentTarget.value);
                                                            }} onBlur={formik.handleBlur} type="date" />
                                                            <Field.ErrorText>{formik.errors.fechaInicio}</Field.ErrorText>
                                                        </Field.Root>
                                                        <Field.Root invalid={formik.touched.fechaFin && Boolean(formik.errors.fechaFin)}>
                                                            <Field.Label>Fecha fin</Field.Label>
                                                            <Input name="fechaFin" type="date" value={formik.values.fechaFin} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                            <Field.ErrorText>{formik.errors.fechaFin}</Field.ErrorText>
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