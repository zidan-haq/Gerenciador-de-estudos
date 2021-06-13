export function constraintInteger(...input) {
    input.forEach(x => x.addEventListener("keyup", e => x.value = x.value.replaceAll(/\D/g, "")));
}

export function constraintIntSequences(...input) {
    input.forEach(x => x. addEventListener("keyup", e => {
        x.value = x.value.replaceAll(/[^\d;:]/g, "");
        x.value = x.value.replaceAll(/;{1,}/g, ";");
        x.value = x.value.replaceAll(/:{1,}/g, ":");
        x.value = x.value.replaceAll(/;:|:;/g, ";");
    }));
}