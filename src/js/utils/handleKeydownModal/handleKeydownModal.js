//'keydown' event handler for the 'Escape' key in a modal window,
//the modal window is closed, takes the event that occurred as a
//parameter
import { toggleModal } from "../toggleModal/toggleModal";

export function handleKeydownModal(event) {
    if (event.code === "Escape") {
        toggleModal(event);
    }
}