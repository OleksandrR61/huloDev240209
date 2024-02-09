//Generating a card for a slider, taking the video source as a parameter 
export function generateCard(src) {
    return `
        <iframe
            class="video video_preview"
            src="${src}?controls=0"        
        ></iframe>
    `;
}