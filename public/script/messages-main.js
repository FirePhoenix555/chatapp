function getUID(url) {
    let s = url.split("#");
    if (s.length <= 1) return "";
    return s[s.length - 1];
}

window.onload = () => {
    const uid = getUID(location.href);

    if (!uid) {
        location.href = "/";
        throw new Error("UID not found.");
    }
    
    UIDCallback(uid);
}


function UIDCallback(UID) { // run when UID received
    console.log(UID);

    // send request to server for messages
}

function lerp(oldmin, oldmax, newmin, newmax, val) {
    let t = (val - oldmin) / (oldmax - oldmin);
    return newmin + (newmax - newmin) * t;
}

function sendMessage(content) {
    // send api thing
    // todo
    // make sure to pass in the content (html needs to be updated when I have a textarea)
}