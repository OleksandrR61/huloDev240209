//Generating a pagination bar for a modal window, the index of the video that
//is currently playing in the video collection is taken as a parameter
import { exampleGallery } from "../../const";

export function generateModalPagination(currentIndex) {
    return `
        <ul class="pagination">
            ${exampleGallery.reduce((markup, _, index) => (markup + `
                <li
                    class="pagination_item${index == currentIndex ?
                        " pagination_item__current" :
                        ""
                    }"
                    data-index="${index}"
                ></li>
            `), "")}
        </ul>
    `;
}