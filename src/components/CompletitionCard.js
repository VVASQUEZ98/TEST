import { Group, IconButton, Progress } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { completed, validValue } from "./slices/CompletitionSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { ResetFormButton } from "./ResetFormButton";

export const CompletitionCard = () => {
    const value = useSelector(validValue)
    const isCompleted = useSelector(completed);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const guardar = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/preview');
        }, 1000)
    }

    return (
        <Group width="100%">
            <Progress.Root size="lg" width={"100%"} value={value} colorInterpolation="linearRGB" colorPalette="green" mb="2">
                <Progress.Track>
                    <Progress.Range />
                </Progress.Track>
            </Progress.Root>
            <IconButton rounded="full" loading={loading} onClick={guardar} disabled={loading || !isCompleted}>
                <FaCheck />
            </IconButton>
            <ResetFormButton />
        </Group>
    );
}