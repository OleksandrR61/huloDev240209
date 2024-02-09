//'click' event handler for the slider, handles the click event on the video
//card and on the slider flipping buttons, takes the event that occurred as a
//parameter
import { moveSlider } from "../moveSlider/moveSlider";
import { toggleModal } from "../toggleModal/toggleModal";

export function handleClickSlider(event) {
    const { target: { className, dataset } } = event;

    //Gate for clicks on unnecessary elements
    if (!className.includes("list_frame")
        && !className.includes("slider_button")) {
            return;
    }

    //Handling a click on the video card, opening a modal window with the selected video
    if (className.includes("list_frame")) {
        toggleModal(event);
        return;
    }
    
    ////Handling a click on the slider flipping buttons, the slider is scrolling
    moveSlider(dataset.direction);
    
    //Removing focus from a slider flipping button
    event.target.blur();
}