//A function for searching an element in the DOM, the selector of the element
//being searched is taken as a parameter, a pointer to this element is returned
export function getElement(selector) {
    return document.querySelector(selector);
}