function maRead(evt) {
    let e = evt.target;
    let elt = e.parentElement.querySelector('progress-ring');
    elt.hidden = false;
    setTimeout(() => elt.setProgress(1), 10); // css transitions didn't work without this
}