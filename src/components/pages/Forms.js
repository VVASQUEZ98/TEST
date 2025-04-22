import React, { useEffect } from "react";
import '../../App';
import { ProjectForm } from "../proyectos/ProjectForm";
import { SkillForm } from "../habilidades/SkillsForm";
import { Grid, GridItem, Separator, Flex } from "@chakra-ui/react";
import { EducationForm } from "../educacion/EducationForm";
import { SignupForm } from "../perfil/SignupForm";
import { ContactForm } from "../contacto/ContactForm";
import { LanguageForm } from "../idiomas/LanguageForm";
import { CompletitionCard } from "../CompletitionCard";
import { UserImage } from "../perfil/UserImage";
import { ReferenceForm } from "../referencias/ReferenceForm";
import { ExperienceForm } from "../experience/ExperienceForm";
import { useDispatch } from "react-redux";
import { setFinished } from "../slices/UserSlice";

const Form = ({ setUserData }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFinished(false));
  })

  return (
    <>
      <CompletitionCard />
      <Grid templateRows="repeat(1, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={5}>
        <GridItem rowSpan={2} colSpan={1} height="fit-content">
          <Flex direction="column" gap="3">
            <UserImage />
            <Separator />
            <EducationForm />
            <Separator />
            <ContactForm />
            <Separator />
            <ExperienceForm />
          </Flex>
        </GridItem>
        <GridItem colSpan={4}>
          <Flex direction="column" gap={5}>
            <SignupForm />
            <Separator />
            <SkillForm />
            <Separator />
            <LanguageForm />
            <Separator />
            <ProjectForm />
            <Separator />
            <ReferenceForm />
            <Separator />
          </Flex>
        </GridItem>
      </Grid>

    </>
  );
};

export default Form;