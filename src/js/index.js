import {
    getElement,
    handleClickSlider,
} from "./utils";
import { exampleGallery } from "./const";
import {
    generateCard,
    generateList,
    generateSlider,
} from "./partials";

const container = getElement(".container")

//Adding a Slider
container.insertAdjacentHTML("beforeend",
    generateSlider(
        generateList(
            exampleGallery.map(video => generateCard(video))
        )
    )
);

//Adding an event handler
container.addEventListener('click', handleClickSlider);