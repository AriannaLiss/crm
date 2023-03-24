import { saveProductEvent, hideModalWindowEvent } from "./events.js";

export function isBtnModal () {
    const save = document.querySelector("#save");
    const close = document.querySelector("#close");

    save.onclick = saveProductEvent;
    close.onclick = hideModalWindowEvent;
}

