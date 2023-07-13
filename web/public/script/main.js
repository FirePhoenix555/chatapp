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

async function genMessages(uid, valid=()=>true, ms2) {
    let req = new API_RequestHandler();
    let res = await req.get('MESSAGES_FOR_USER', { uid });
    let data = await res.json();

    let div = document.getElementById('messages');
    
    for (let i = 0; i < data.length; i++) {
        let msg = data[i];

        if (!valid(msg)) continue;
        
        let messagebox;
        if (!ms2) messagebox = new MessageBox(msg.id, msg.from);
        else messagebox = new MessageBox2(msg.id, msg.from);
        messagebox.initAttributes(msg.from + "todo make this actual user w another get", msg.content, msg.time);

        div.appendChild(messagebox);
    }
}

window.onload = function() {
    const UID = window.getCookie('uid'); // todo add auth
    
    if (!UID) location.href = "/login";

    genMessages(UID);
}