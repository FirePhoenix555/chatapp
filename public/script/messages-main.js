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