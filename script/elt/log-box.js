class LogBox extends HTMLElement {
    constructor() {
        super();
    }

    setCookie(state) {
        document.cookie = "lbopen=" + state + ";";
    }

    toggle() {
        let arrow = this.parentElement.querySelector('.arrow');

        if (!this.opened) {
            this.setAttribute("class", this.constClasses + "h-16 mt-0");
            arrow.setAttribute("class", arrow.getAttribute("class").replace("rotate-180", "rotate-0"));
        } else {
            this.setAttribute("class", this.constClasses + "h-0 my-0 py-0");
            arrow.setAttribute("class", arrow.getAttribute("class").replace("rotate-0", "rotate-180"));
        }

        this.opened = !this.opened;
        this.setCookie(this.opened);
    }

    addListener() {
        this.parentElement.querySelector('.arrow').addEventListener('click', () => {
            this.toggle();
        })
    }
    
    connectedCallback() {
        this.constClasses = this.getAttribute("class") + " ";
        this.setAttribute("class", this.constClasses + "h-16 mt-0");

        const user = this.getAttribute("user") || "null";

        this.innerHTML = `
            Logged in as <br>
            <h2 class="font-bold">&lt; ${user} &gt;</h2>
        `;

        this.addListener();

        // saving open/closed states with cookies
        this.opened = true;
        let cookie = window.getCookie('lbopen');
        if (exists(cookie) && (cookie === 'true') != this.opened) this.toggle();
        else if (!exists(cookie)) this.setCookie(true);
    }
}

window.customElements.define('log-box', LogBox);