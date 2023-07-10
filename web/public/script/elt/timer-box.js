class TimerBox extends HTMLElement {
    constructor() {
        super();
    }

    timerupdated(val) {
        let elt = this.querySelector('input');
        let p = elt.parentElement.parentElement.querySelector('.timer-value');
        p.innerText = val + "s";
        let x = lerp(elt.getAttribute('min'), elt.getAttribute('max'), 8, 8 + elt.offsetWidth - p.offsetWidth, val);
        p.style["margin-left"] = x + "px";
    }

    initialize(val) {
        this.querySelector('div').hidden = false;
        let tv = this.querySelector('.sval');
        tv.innerText = "00s";
        tv.style.width = tv.offsetWidth + "px";
        tv.innerText = val + "s";
        this.timerupdated(val);
        this.querySelector('div').hidden = true;
    }

    connectedCallback() {
        const value = this.getAttribute('value') || 1; // in seconds

        this.setAttribute("class", "relative h-full ml-3 px-2 flex items-center border-x border-black hover:cursor-pointer")

        this.innerHTML = `
            <p class="mr-1">TIMER</p>
            <img src="/imgs/timer.png" class="w-4 h-fit mx-1">
            <b class="sval ml-1 text-center">${value}s</b>

            <div class="border border-black absolute bottom-[130%] inset-x-3 w-auto mx-auto h-20 bg-white hover:cursor-auto" hidden>
                <p class="timer-value mx-2 px-0 my-1 py-1 mb-0 w-fit">${value}s</p>
                <div class="input w-[80%] mx-auto">
                    <input class="w-full" type="range" min="1" max="60" value="${value}" oninput="this.parentElement.parentElement.parentElement.timerupdated(this.value)">
                </div>
            </div>
        `;

        this.addEventListener('click', () => this.revealMenu(this, 'click'));
        this.addEventListener('mouseover', () => this.revealMenu(this, 'mouseout'));

        this.cl = new CL(this, () => this.hideMenu(this), this.querySelector('div'), () => this);

        this.initialize(value);
    }

    revealMenu(menu, type) {
        const div = menu.querySelector('div');
        div.hidden = false;
        this.cl.addHideListener(type);
    }

    hideMenu(menu) {
        const div = menu.querySelector('div');
        div.hidden = true;

        let val = this.querySelector('.timer-value').innerText.replace("s", "");
        this.querySelector('b').innerText = val + "s";
        this.setAttribute("value", val);
    }
}

window.customElements.define('timer-box', TimerBox);