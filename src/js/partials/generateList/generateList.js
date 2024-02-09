//Generating a list of cards for the slider, taking a video collection as a
//parameter
export function generateList(elements) {
    return `
        <ul class="slider">
            ${elements.reduce(
                (markup, element, index) => markup + `
                    <li class="list_item">
                        ${element}
                        <div class="list_frame" data-index="${index}"></div>
                    </li>
                `, "")
            }
        </ul>
    `;
}