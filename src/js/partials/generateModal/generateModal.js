//Generating content for a modal window, taking the video index in the video
//collection as a parameter
import { generatePlayer } from "../generatePlayer/generatePlayer";
import { exampleGallery } from "../../const";
import { generateModalPagination } from "../generateModalPagination/generateModalPagination";

export function generateModal(index) {
    return `
        <button class="button modal_button"></button>
        ${generatePlayer(exampleGallery[index])}
        ${generateModalPagination(index)}
    `;
}