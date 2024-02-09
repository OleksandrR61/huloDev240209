//Generation of a slider, the element that will be placed in the slider is
//taken as a parameter. In my case this is a collection of videos
import { SLIDER_DIRECTION_MOVE } from "../../const";

export function generateSlider(element) {
    return `
        ${element}
        <button
            class="button slider_button slider_button__left"
            data-direction="${SLIDER_DIRECTION_MOVE.LEFT}"
        ></button>
        <button
            class="button slider_button slider_button__right"
            data-direction="${SLIDER_DIRECTION_MOVE.RIGHT}"
        ></button>
    `;
}