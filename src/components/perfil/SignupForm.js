import { useEffect, useState } from "react";
import { Fieldset, Input, Field, Group, Button, Box, Heading, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { add, reduce } from '../slices/CompletitionSlice';
import { isEditable, set } from "../slices/UserSlice";
import { useDispatch, useSelector } from 'react-redux';
export const SignupForm = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector((state) => state.user);
    const editable = useSelector(isEditable);

    const formik = useFormik({
        initialValues: {
            nombre: userInfo.nombre,
            titulo: userInfo.titulo,
            email: userInfo.email,
            telefono: userInfo.telefono
        },
        validationSchema: Yup.object({
            nombre: Yup
                .string()
                .required('Requerido'),
            titulo: Yup
                .string()
                .required('Requerido'),
            email: Yup.string().email().required('Requerido'),
            telefono: Yup.number().required('Requerido'),
        }),
        validateOnMount: true,
        onSubmit: values => {
            setLoading(true);
            dispatch(set(values));
            setTimeout(() => setLoading(false), 1000)
        },

    })


    const AutoSubmit = () => {
        useEffect(() => {
            if ((formik.isValid && Object.keys(formik.touched).length > 0) || (userInfo.nombre !== "")) {
                dispatch(add('SignupForm'));
            } else {
                dispatch(reduce('SignupForm'));
            }
        }, []);
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <AutoSubmit />
            <Heading my="2">Datos generales</Heading>
            <Fieldset.Root>
                <Fieldset.Content>
                    {
                        (editable &&
                            (
                                <>
                                    <Field.Root invalid={formik.touched.nombre && Boolean(formik.errors.nombre)}>
                                        <Field.Label>Nombre</Field.Label>
                                        <Input name="nombre" value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        <Field.ErrorText>{formik.errors.nombre}</Field.ErrorText>
                                    </Field.Root>

                                    <Group>
                                        <Field.Root invalid={formik.touched.titulo && Boolean(formik.errors.titulo)}>
                                            <Field.Label>Titulo</Field.Label>
                                            <Input name="titulo" value={formik.values.titulo} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            <Field.ErrorText>{formik.errors.titulo}</Field.ErrorText>
                                        </Field.Root>
                                    </Group>
                                    <Group>
                                        <Field.Root invalid={formik.touched.telefono && Boolean(formik.errors.telefono)}>
                                            <Field.Label>Telefono</Field.Label>
                                            <Input name="telefono" value={formik.values.telefono} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            <Field.ErrorText>{formik.errors.telefono}</Field.ErrorText>
                                        </Field.Root>
                                        <Field.Root invalid={formik.touched.email && Boolean(formik.errors.email)}>
                                            <Field.Label>Email</Field.Label>
                                            <Input name="email" type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
                                        </Field.Root>
                                    </Group>
                                </>
                            ))
                        || (!editable &&
                            (
                                <>
                                    <Field.Root invalid={formik.touched.nombre && Boolean(formik.errors.nombre)}>
                                        <Field.Label>Nombre</Field.Label>
                                        <Text>{formik.values.nombre}</Text>
                                        <Field.ErrorText>{formik.errors.nombre}</Field.ErrorText>
                                    </Field.Root>

                                    <Group>
                                        <Field.Root invalid={formik.touched.titulo && Boolean(formik.errors.titulo)}>
                                            <Field.Label>Titulo</Field.Label>
                                            <Text>{formik.values.titulo}</Text>
                                            <Field.ErrorText>{formik.errors.titulo}</Field.ErrorText>
                                        </Field.Root>
                                    </Group>
                                    <Group>
                                        <Field.Root invalid={formik.touched.telefono && Boolean(formik.errors.telefono)}>
                                            <Field.Label>Telefono</Field.Label>
                                            <Text>{formik.values.telefono}</Text>
                                            <Field.ErrorText>{formik.errors.telefono}</Field.ErrorText>
                                        </Field.Root>
                                        <Field.Root invalid={formik.touched.email && Boolean(formik.errors.email)}>
                                            <Field.Label>Email</Field.Label>
                                            <Text>{formik.values.email}</Text>
                                            <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
                                        </Field.Root>
                                    </Group>
                                </>
                            ))
                    }
                    {
                        editable && (
                            <Box >
                                <Button type="submit" loading={loading}>
                                    Guardar
                                </Button>
                            </Box>
                        )
                    }
                </Fieldset.Content>
            </Fieldset.Root>
        </form>
    )
}