import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Field, Fieldset, For, createListCollection, Select, Portal, useSelectContext, Button, CloseButton, Container, Group, Wrap, Heading, RatingGroup, HStack, Tag} from "@chakra-ui/react";
import { addSkills, replaceSkill, removeSkills } from '../slices/SkillsSlice';
import { LuAppWindow, LuPlus, LuServer } from "react-icons/lu"
import { FaPeopleGroup } from "react-icons/fa6";
import { add, reduce } from '../slices/CompletitionSlice';
import { isEditable } from '../slices/UserSlice';

export const SkillForm = () => {
    const [open, setOpen] = useState(false)
    const [editIndex, setIndex] = useState(-1);
    const [category, setCategory] = useState('');
    const [skill, setSkill] = useState('');
    const [rating, setRating] = useState(0);
    const [skills, setSkills] = useState([]);
    const editable = useSelector(isEditable)

    const newSkills = useSelector((state) => state.skills);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            habilidad: '',
            categoria: '',
            iconoCategoria: null,
            calificacion: 0
        },
        validationSchema: Yup.object({
            habilidad: Yup
                .string()
                .required('Requerido'),
            categoria: Yup
                .string()
                .required('Requerido'),
            calificacion: Yup
                .number()
                .min(0)
                .max(5)
        }),
        onSubmit: values => {
            const newValues = { ...values, name: skills.find(x => x.value === values.habilidad).name };
            if (editIndex === -1) {
                dispatch(addSkills(newValues));
                reset();
            } else {
                dispatch(replaceSkill({ item: newValues, index: editIndex }))
            }
        }
    })

    const reset = () => {
        formik.resetForm();
        changeCategory({ value: [''] });
        setRating(0);
        setIndex(-1);

        if (!editable) {
            window.history.replaceState(null, null, "/preview")
        }
    }

    const categories = createListCollection({
        items: [
            {
                name: "",
                value: "",
                skills: []
            },
            {
                name: "Frontend",
                value: "frontend",
                skills: [
                    { name: "HTML", value: "html" },
                    { name: "CSS", value: "css" },
                    { name: "JavaScript", value: "javascript" },
                    { name: "React", value: "react" },
                    { name: "Vue.js", value: "vue.js" }
                ],
                icon: LuAppWindow
            },
            {
                name: "Backend",
                value: "backend",
                skills: [
                    { name: "Node.js", value: "node.js" },
                    { name: "Python", value: "python" },
                    { name: "Django", value: "django" },
                    { name: "Java", value: "java" },
                    { name: "Spring Boot", value: "spring boot" }
                ],
                icon: LuServer
            },
            {
                name: "Soft skills",
                value: "softskills",
                skills: [
                    { name: "Comunicación", value: "comunicación" },
                    { name: "Trabajo en equipo", value: "trabajo en equipo" },
                    { name: "Resolución de problemas", value: "resolución de problemas" },
                    { name: "Gestión del tiempo", value: "gestión del tiempo" },
                    { name: "Adaptabilidad", value: "adaptabilidad" }
                ],
                icon: FaPeopleGroup
            }
        ]
    });

    const renderIcon = (icon) => {
        const IconRendered = icon;
        return (<IconRendered />);
    };

    const SelectValue = () => {
        const select = useSelectContext();
        const item = select.selectedItems[0];
        return (
            <Select.ValueText placeholder="Select member">
                <HStack>
                    {item?.icon && renderIcon(item?.icon)}
                    {item?.name}
                </HStack>
            </Select.ValueText>
        )
    }

    const changeCategory = (e) => {
        formik.setFieldValue('categoria', e.value[0]);
        if (categories.items.find(x => x.value === e.value[0])) {
            const temp = categories.items.find(x => x.value === e.value[0]).skills;
            setSkills(temp);
        }
        setCategory(e.value);
    }

    const changeHabilidad = (e) => {
        formik.setFieldValue('habilidad', e.value[0]);
        setSkill(e.value);
    }

    const changeRating = (e) => {
        formik.setFieldValue('calificacion', e.value);
        setRating(e.value);
    }

    const removeSkill = (e, index) => {
        e.preventDefault();
        dispatch(removeSkills(index));
    }

    const editSkill = (item, index) => {
        setOpen(true);
        setIndex(index);
        changeCategory({ value: [item.categoria] });
        changeHabilidad({ value: [item.habilidad] })
        changeRating({ value: item.calificacion });

        if (!editable) {
            window.history.replaceState(null, null, "/edit/skill")
        }
    }

    const AutoSubmit = () => {
        const { isValid, touched } = formik;

        useEffect(() => {
            if (newSkills.length > 0) {
                dispatch(add('SkillsForm'))
            } else {
                dispatch(reduce('SkillsForm'));
            }
        }, [isValid, touched])
        return null;
    }

    const ListSkills = () => {
        return (
            <Wrap py="2">
                <For each={newSkills ?? []}>
                    {(item, index) => (
                        <Group key={'SkillTag' + index} attached>
                            <Tag.Root rounded="full" roundedRight={editable ? "none" : "full"} p="2" pr={editable ? "2" : "4"} height="35px">
                                <Group onClick={() => editSkill(item, index)}>
                                    <Tag.StartElement>
                                        {item.iconoCategoria && renderIcon(item.icon)}
                                    </Tag.StartElement>
                                    <Tag.Label>{item.name}</Tag.Label>

                                    <RatingGroup.Root readOnly value={item.calificacion} m="0">
                                        <RatingGroup.HiddenInput />
                                        <RatingGroup.Control />
                                    </RatingGroup.Root>
                                </Group>
                            </Tag.Root>
                            {
                                editable &&
                                (
                                    <CloseButton onClick={removeSkill} bg="red.muted" roundedRight="full" height="35px" _hover={{
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

    if (editable || newSkills.length > 0) {
        return (
            <div>
                <AutoSubmit />
                <Heading my="2">Habilidades</Heading>
                <ListSkills />
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
                                        <Dialog.Title>Nueva habilidad</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <Container>
                                            <Fieldset.Root>
                                                <Fieldset.Content>
                                                    <Field.Root invalid={formik.touched.categoria && Boolean(formik.errors.categoria)}>
                                                        <Select.Root name="categoria" value={category} onValueChange={changeCategory} collection={categories}>
                                                            <Select.HiddenSelect />
                                                            <Select.Label>Categoría</Select.Label>
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
                                                                    {categories.items.map(item => (
                                                                        <Select.Item item={item} key={item.name}>
                                                                            {item.name}
                                                                            <Select.ItemIndicator />
                                                                        </Select.Item>
                                                                    ))}
                                                                </Select.Content>
                                                            </Select.Positioner>
                                                        </Select.Root>
                                                    </Field.Root>

                                                    <Field.Root invalid={formik.touched.habilidad && Boolean(formik.errors.habilidad)}>
                                                        <Select.Root name="habilidad" value={skill}
                                                            onValueChange={changeHabilidad}
                                                            onBlur={formik.handleBlur}
                                                            collection={createListCollection({ items: skills })}>
                                                            <Select.HiddenSelect />
                                                            <Select.Label>Habilidad</Select.Label>
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
                                                                    {skills.map(item => (
                                                                        <Select.Item item={item} key={item.name}>
                                                                            {item.name}
                                                                            <Select.ItemIndicator />
                                                                        </Select.Item>
                                                                    ))}
                                                                </Select.Content>
                                                            </Select.Positioner>
                                                        </Select.Root>

                                                        <Field.ErrorText>{formik.errors.habilidad}</Field.ErrorText>
                                                    </Field.Root>

                                                    <Field.Root>
                                                        <Field.Label>Calificación</Field.Label>
                                                        <RatingGroup.Root
                                                            name="calificacion"
                                                            value={rating}
                                                            onValueChange={changeRating}
                                                            onBlur={formik.handleBlur}
                                                            allowHalf >
                                                            <RatingGroup.HiddenInput />
                                                            <RatingGroup.Control>
                                                                {Array.from({ length: 5 }).map((_, index) => (
                                                                    <RatingGroup.Item key={index} index={index + 1}>
                                                                        <RatingGroup.ItemIndicator />
                                                                    </RatingGroup.Item>
                                                                ))}
                                                            </RatingGroup.Control>
                                                        </RatingGroup.Root>
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
                                            {editIndex >= 0 ? 'Actualizar' : 'Agregar habilidad'}
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
            </div >
        )
    }
}