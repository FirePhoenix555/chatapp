function maRead(evt) {
    let e = evt.target;
    let elt = e.parentElement.querySelector('progress-ring');
    elt.hidden = false;
    setTimeout(() => elt.setProgress(1), 10); // css transitions didn't work without this
}

function exists(a) {
    return a !== undefined && a !== null && a !== "";
}

window.getCookie = name => document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))?.at(2);

async function genMessages(uid) {
    let req = new API_RequestHandler();
    let res = await req.get('MESSAGES_FOR_USER', { uid });
    let data = await res.json();

    let div = document.getElementById('messages');
    
    for (let i = 0; i < data.length; i++) {
        let msg = data[i];
        
        let messagebox = new MessageBox();
        messagebox.initAttributes(msg.from, msg.content, msg.time);

        div.appendChild(messagebox);
    }
}

window.onload = function() {
    const UID = window.getCookie('uid'); // todo add auth
    
    if (!UID) location.href = "/login";

    genMessages(UID);
}