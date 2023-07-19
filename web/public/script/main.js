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

    let rm = [];
    let messages = [];
    
    for (let i = data.length - 1; i >= 0; i--) {
        let msg = data[i];

        if (!valid(msg)) continue;

        let ures = await req.get('USER', { uid: msg.from });
        let udata = await ures.json();
        let username = udata.user;
        
        let messagebox;
        if (!ms2) {
            messagebox = new MessageBox(msg.id, msg.from);

            if (rm.includes(msg.from)) continue;
            else rm.push(msg.from);
        } else {
            messagebox = new MessageBox2(msg.id, msg.from);
        }

        messagebox.initAttributes(username, msg.content, msg.time);

        messages.push(messagebox);
    }

    for (let i = messages.length - 1; i >= 0; i--) { // essentially reversing array before looping normally
        messages[i].addToDocument(div);
    }
}

window.onload = function() {
    const UID = window.getCookie('uid'); // todo add auth
    
    if (!UID) location.href = "/login";

    genMessages(UID);
}