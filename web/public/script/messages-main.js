function getUID(url) {
    let s = url.split("#");
    if (s.length <= 1) return "";
    return s[s.length - 1];
}

async function gm(to, from) {
    await genMessages(to, msg => {
        return msg.from == from;
    }, true);
}

window.onload = () => {
    const to = window.getCookie('uid'); // todo add auth
    
    if (!to) location.href = "/login";

    const from = getUID(location.href);

    if (!from) {
        location.href = "/";
        throw new Error("UID not found.");
    }

    gm(to, from);
}

function lerp(oldmin, oldmax, newmin, newmax, val) {
    let t = (val - oldmin) / (oldmax - oldmin);
    return newmin + (newmax - newmin) * t;
}

function sendMessage(elt) {
    // send api thing
    // todo

    let content = elt.value;
    elt.value = "";

    console.log(content);

    let m1 = Array.from(document.querySelectorAll("message-box"));
    let m2 = Array.from(document.querySelectorAll("message-box-2"));
    let m = m1.concat(m2);

    for (let i = 0; i < m.length; i++) {
        let menu = m[i].querySelector('.menu');
        menu.querySelector('div').hidden = false;
        menu.querySelector('progress-ring').hidden = false;
        menu.querySelector('p').hidden = true;
        setTimeout(() => menu.querySelector('progress-ring').setProgress(1), 10); // css transitions didn't work without this
    }
}

function irec(event) { // ([textarea] i[nput] rec[eived])
    if (event.keyCode == 13 && !event.shiftKey) {
        sendMessage(event.target);
        event.preventDefault();
    }
}