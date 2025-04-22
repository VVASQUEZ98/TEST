import { Progress } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { validValue } from "./slices/CompletitionSlice";

export const CompletitionBar = ({ }) => {
    const value = useSelector(validValue)
    
    return (
        <Progress.Root size="lg" value= {value} colorInterpolation="linearRGB" colorPalette="green" mb="2">
            <Progress.Track>
                <Progress.Range />
            </Progress.Track>
        </Progress.Root>
    );
}