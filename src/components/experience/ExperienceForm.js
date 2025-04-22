import { useState, useEffect } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";

import { Dialog, Field, Fieldset, CloseButton, Portal, Button, Container, Input, Group, For, Heading, Textarea, Timeline, Text, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

import { add, reduce } from '../slices/CompletitionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isEditable } from "../slices/UserSlice";
import { addExperience, removeExperience, replaceExperience } from "../slices/ExperienceSlice";

export const ExperienceForm = () => {
    const experiences = useSelector((state) => state.experience)
    const dispatch = useDispatch();
    const editable = useSelector(isEditable);
    const [fechaInicio, setFechaInicio] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            puesto: '',
            empresa: '',
            testimonio: '',
            fechaInicio: '2025-01-01',
            fechaFin: '2025-01-01'
        },
        validationSchema: Yup.object({
            puesto: Yup
                .string()
                .required('Requerido'),
            empresa: Yup
                .string()
                .required('Requerido'),
            testimonio: Yup
                .string()
                .notRequired(),
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
                dispatch(addExperience(values));
                reset();
            } else {
                dispatch(replaceExperience({ item: values, index: editIndex }))
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

    const editExperience = (item, index) => {
        setOpen(true);
        formik.setValues(item);
        setEditIndex(index);
        if (!editable) {
            window.history.replaceState(null, null, "/edit/experience")
        }
    }

    const formatDate = (dateString) => {
        var date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString();
    }

    const AutoSubmit = () => {
        const { isValid, touched } = formik;

        useEffect(() => {
            if (experiences.length > 0) {
                dispatch(add('ExperienceForm'))
            } else {
                dispatch(reduce('ExperienceForm'));
            }
        }, [isValid, touched])
        return null;
    }

    const remove = (index) => {
        dispatch(removeExperience(index));
    }

    const ListReferences = () => {
        return (
            <Timeline.Root p="2">
                <For each={experiences}>
                    {(item, index) => (
                        <Timeline.Item key={'Time' + index}>
                            <Timeline.Connector>
                                <Timeline.Separator />
                                <Timeline.Indicator />
                            </Timeline.Connector>
                            <VStack align="start">
                                <Timeline.Title>
                                    <Group >
                                        <Text>{item.puesto}</Text>
                                        {editable && <CloseButton size="xs" onClick={() => remove(index)} />}
                                    </Group>
                                </Timeline.Title>
                                <Timeline.Content cursor="pointer" onClick={() => editExperience(item, index)}>
                                    <Timeline.Description>
                                        {item.empresa} / {formatDate(item.fechaInicio)} {item.fechaFin ? ' - ' + formatDate(item.fechaFin) : null}
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
        );
    }

    if (editable || experiences.length > 0) {
        return (
            <div>
                <AutoSubmit />
                <Heading my="2">Experiencia laboral</Heading>
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
                                        <Dialog.Title>Nueva experiencia</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <Container>
                                            <Fieldset.Root>
                                                <Fieldset.Content>
                                                    <Group>
                                                        <Field.Root invalid={formik.touched.puesto && Boolean(formik.errors.puesto)}>
                                                            <Field.Label>Puesto</Field.Label>
                                                            <Input value={formik.values.puesto} onChange={formik.handleChange} onBlur={formik.handleBlur} name="puesto" />
                                                            <Field.ErrorText>{formik.errors.referencias}</Field.ErrorText>
                                                        </Field.Root>

                                                        <Field.Root invalid={formik.touched.empresa && Boolean(formik.errors.empresa)}>
                                                            <Field.Label>Empresa</Field.Label>
                                                            <Input value={formik.values.empresa} onChange={formik.handleChange} onBlur={formik.handleBlur} name="empresa" />
                                                            <Field.ErrorText>{formik.errors.empresa}</Field.ErrorText>
                                                        </Field.Root>
                                                    </Group>
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
                                                    <Field.Root invalid={formik.touched.testimonio && Boolean(formik.errors.testimonio)}>
                                                        <Field.Label>Notas</Field.Label>
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