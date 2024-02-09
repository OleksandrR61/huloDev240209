//'click' event handler function for a modal window, handles clicking on the
//close button and selecting a video using pagination, the event that occurred
//is accepted as a parameter
import { toggleModal } from "../toggleModal/toggleModal";
import { getElement } from "../getElement/getElement";
import { generateModal } from "../../partials";

export function handleClickModal(event) {
    //Gate for clicks on unnecessary elements
    if (!event.target.classList.contains("modal_button") && 
        !event.target.classList.contains("pagination_item")) {
        return;
    }

    //Handling a click on the close button of a modal window the modal window closes
    if (event.target.classList.contains("modal_button")) {
        toggleModal(event);
        return;
    }

    //Handling a click on the pagination page, the contents of the modal window are repaint
    getElement(".modal").innerHTML = generateModal(event.target.dataset.index);
}