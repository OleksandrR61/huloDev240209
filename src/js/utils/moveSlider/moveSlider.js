//Slider flipping function, takes rotation direction as a parameter
import { getElement } from "../getElement/getElement";
import { SLIDER_DIRECTION_MOVE, exampleGallery } from "../../const";

//Number of elements on screen
const itemsOnScreen = 4;
//Determining the index of the left element on the last pagination page
const firstItemOnLastScreen = exampleGallery.length - itemsOnScreen;
//The width of one element, taking into account the width of the video and the gap between elements
const itemWidth = 250 + 8;
//Slider position when the latest items in the collection are shown on the screen
const maxPosition = -1 * itemWidth * (firstItemOnLastScreen);

export function moveSlider(direction) {
    const slider = getElement(".slider");
    const { style: { left } } = slider;
    
    //Determining the current position of the slider,
    //if this is the first function call the value is set to 0
    let position = left === "" ? 0 : parseInt(left);
    
    //Determining the direction of rotation of the slider
    const moveDirection = direction === SLIDER_DIRECTION_MOVE.LEFT ? 1 : -1;
    
    if (moveDirection === 1 && position === 0) {
        //Setting a new position to the extreme right position in case of left rotation overflow
        position = -1 * firstItemOnLastScreen * itemWidth;
    } else if (moveDirection === -1 && position === maxPosition) {
        //Setting a new position to the extreme left position in case of right rotation overflow
        position = 0;
    } else {
        //Calculation of a new position in the general case
        position += moveDirection * itemWidth;
    }

    //Setting the slider to a new position
    slider.style.left = `${position}px`;
}