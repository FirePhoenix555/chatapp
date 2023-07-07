class MessageBox extends HTMLElement {
    constructor() {
        super();
    }

    delete() {
        // delete the message
        this.parentElement.removeChild(this);

        // send api delete
        // TODO
    }

    connectedCallback() {
        const user = this.getAttribute('user') || 'null';
        const msg = this.getAttribute('msg') || '&nbsp;';
        const time = this.getAttribute('time') || 1; // in seconds

        this.setAttribute("class", "relative m-2 p-2 border border-black w-[80%]")

        this.innerHTML = `
            <p class="text-lg">${user}</p>
            <div>${msg}</div>

            <div class="absolute right-0 top-0 m-0 p-0 flex flex-col items-end w-fit h-full">
                <div class="menu  m-0 p-1 w-fit hover:cursor-pointer">
                    <img src="/imgs/threedots.png" class="h-5">
                    <div class="absolute left-[100%] top-0 m-2 mt-0 p-2 pb-1 border border-black hover:cursor-auto" hidden>
                        <p class="border border-black mb-1 p-1 text-center text-sm whitespace-nowrap hover:cursor-pointer" onclick="maRead(event)">Mark as <br> read</p>
                        <div class="flex justify-center">
                            <progress-ring stroke="3" radius="15" progress="0" time="${time}" hidden></progress-ring>
                        </div>
                    </div>
                </div>

                <div class="m-1 mt-auto p-0.5 border border-black w-fit hover:cursor-pointer">
                    <a class="text-sm no-underline text-black" href="/messages/#${user /*make this the ID of the user at some point*/}">Reply</a>
                </div>
            </div>
        `;

        const menu = this.querySelector(".menu");

        menu.addEventListener('click', () => this.revealMenu(menu, 'click'));
        menu.addEventListener('mouseover', () => this.revealMenu(menu, 'mouseout'));

        this.cl = new CL(this, () => this.hideMenu());
    }

    revealMenu(menu, type) {
        const div = menu.querySelector('div');
        div.hidden = false;
        this.cl.addHideListener(type);
    }

    hideMenu() {
        const menu = this.querySelector(".menu");
        const div = menu.querySelector('div');
        div.hidden = true;
    }
}

// functionality from https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element/3028037#3028037
class CL { // click listener
    constructor(parent, hidecb, div=parent.querySelector(".menu").querySelector('div'), menu=p=>p.querySelector('.menu')) {
        this.parent = parent;
        this.div = div;
        this.menu = menu;
        this.hidecb = hidecb;
        this.listeners = [];
    }

    outsideClickListener(event) {
        if (event.type == "mouseout" && this.listeners.includes("click")) return; // if they've clicked, don't hide on a mouseout

        const menu = this.menu(this.parent);
        if (!menu.contains(event.target) && !this.div.hidden) {
            this.hidecb();
            this.removeClickListener(event.type);
        }
    }

    removeClickListener(type) {
        document.removeEventListener(type, e => this.outsideClickListener(e));
        this.listeners.splice(this.listeners.indexOf(type), 1);
    }

    addHideListener(type) {
        if (this.listeners.includes(type)) return; // no duplicates
        document.addEventListener(type, e => this.outsideClickListener(e));
        this.listeners.push(type);
    }
}

window.customElements.define('message-box', MessageBox);