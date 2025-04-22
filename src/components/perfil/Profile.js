
import Header from "../Header";
import { ProjectForm } from '../proyectos/ProjectForm';
import { SkillForm } from '../habilidades/SkillsForm';
import { useSelector } from "react-redux";

export const Profile = () => {
    const userData = useSelector((state) => state.user);

    return (
        <>
            <Header
                name={userData.name}
                title={userData.title}
                email={userData.email}
                phone={userData.phone}
                linkedin={userData.linkedin}
            />
            <ProjectForm projects={userData.projects} />
            <SkillForm />
        </>
    );
}