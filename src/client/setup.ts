// ----- Procedures ----- //

import {logger} from "../logger";
// import { nativeClient } from 'native/nativeApi';

// REPLACE by `nativeClient.getFontSize()`
function getFontSize() {
    return new Promise(resolve => setTimeout(() => resolve(67.5), 200));
}

async function fontSize() {
    const fontSize = await getFontSize();
    document.documentElement.style.fontSize = `${fontSize}%`;
    document.body.style.display = 'block';
}

function handleMessage(interactive: HTMLIFrameElement, message: string): void {

    try {
        const { type, value } = JSON.parse(message);

        if (type === 'set-height') {
            interactive.height = value;
        }
    } catch (e) {
        logger.error(e);
    }

}

const updateInteractives = (interactives: Element[]) => ({ data, source }: MessageEvent): void =>
    interactives.forEach(elem => {
        if (elem instanceof HTMLIFrameElement && source === elem.contentWindow) {
            handleMessage(elem, data);
        }
    });

function interactives(): void {

    const interactives = Array.from(document.querySelectorAll('.interactive iframe'));
    window.addEventListener('message', updateInteractives(interactives), false);

}

function twitter(): void {
    const isDarkMode = window?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
    const themeMeta = document.getElementById('twitter-theme');

    if (isDarkMode) {
        themeMeta?.setAttribute('content', 'dark');
    }
}

function setup(): void {

    fontSize();
    interactives();
    twitter();

}


// ----- Exports ----- //

export default setup;
