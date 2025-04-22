import { Image, Box, FileUpload, CloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEditable, setImage, userImage } from "../slices/UserSlice";

export const UserImage = () => {
    const [imagen, setImagen] = useState(null);
    const dispatch = useDispatch();
    const imagenStore = useSelector(userImage);
    const editable = useSelector(isEditable);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const cargarImagen = async (filesDetails) => {
        if (filesDetails.files && filesDetails.files.length > 0) {
            const imagen = await toBase64(filesDetails.files[0]);
            setImagen(imagen);
            dispatch(setImage(imagen));
        };
    }

    const eliminarImagen = () => {
        setImagen(null);
        dispatch(setImage(null));
    }

    return (<Box >
        <FileUpload.Root alignItems="stretch" maxFiles={1} accept="image/*" cursor="auto" onFileAccept={cargarImagen} _disabled={{
            cursor: "auto"
        }} disabled={!editable} allowDrop={false}>
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone borderRadius="full" rounded="full" width="250px" aspectRatio="square" p="0" m="0" disableClick={!!imagenStore} cursor={imagenStore || !editable ? "auto" : "pointer"}>
                <FileUpload.DropzoneContent>
                    {imagenStore && <Box>
                        <Image position="relative" top={editable ? "7%" : "0%"} borderRadius="full" rounded="full" width="100%" aspectRatio="square" src={imagenStore} cursor="auto" />
                        {
                            editable && <CloseButton onClick={eliminarImagen} position="relative" bg="red.muted" rounded="full" right="-35%" top="-10%" cursor="pointer" _hover={{
                                bg: "red.emphasized",
                            }} />
                        }
                    </Box>}
                    {!imagenStore && editable && (<><Box>Cargar imagenes</Box>
                        <Box color="fg.muted">.png, .jpg up to 5MB</Box></>)}
                </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.ItemGroup>
            </FileUpload.ItemGroup>
        </FileUpload.Root>
    </Box>)
}