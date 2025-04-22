import { Button, CloseButton, Dialog, IconButton, Portal } from "@chakra-ui/react";
import { FaTrashCan } from "react-icons/fa6";
import { persist } from "./persist";

export const ResetFormButton = () => {
    const reset = () => {
        persist.purge().then(() => {
            window.location.reload();
        }).catch(err => {
            console.error(err);
        })
    }

    return (
        <Dialog.Root role="alertdialog">
            <Dialog.Trigger asChild>
                <IconButton rounded="full" bg="red" color="white">
                    <FaTrashCan />
                </IconButton>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>¡Alto!</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                ¿Seguro quieres reiniciar tu portafolio?
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Button colorPalette="red" onClick={reset}>Aceptar</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}