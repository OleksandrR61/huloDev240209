//Function for opening/closing a modal window, as a parameter the event that
//caused the opening/closing of the modal window
import { getElement } from "../getElement/getElement";
import { handleKeydownModal } from "../handleKeydownModal/handleKeydownModal";
import { handleClickModal } from "../handleClickModal/handleClickModal";
import { generateModal } from "../../partials";

export function toggleModal(event) {
    const modal = getElement(".modal");
    
    modal.classList.toggle("modal__shown");

    //Processing the closing of a modal window,
    //clearing the contents of the window and removing event handlers
    if (!modal.classList.contains("modal__shown")) {
        modal.innerHTML = "";

        modal.removeEventListener('click', handleClickModal);
        document.removeEventListener('keydown', handleKeydownModal);
        
        return;
    }

    //Filling the contents of the modal window
    modal.innerHTML = generateModal(event.target.dataset.index);

    //Adding event handlers
    modal.addEventListener('click', handleClickModal);
    document.addEventListener('keydown', handleKeydownModal);
}