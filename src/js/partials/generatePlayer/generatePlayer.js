//Generating a player for a modal window, the index of the video that was
//selected in the slider is taken as a parameter
export function generatePlayer(src) {
    return `<iframe
        class="video video_player"
        src="${src}?autoplay=1"        
    ></iframe>`;
}