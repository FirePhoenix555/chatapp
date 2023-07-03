class MessageBox extends HTMLElement {
    constructor() {
        super();
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
                <div class="m-0 p-1 w-fit hover:cursor-pointer">
                    <img src="imgs/threedots.png" class="h-5">
                    <div class="absolute left-[100%] top-0 m-2 mt-0 p-2 pb-1 border border-black hover:cursor-auto" hidden>
                        <p class="border border-black mb-1 p-1 text-center text-sm whitespace-nowrap hover:cursor-pointer" onclick="maRead(event)">Mark as <br> read</p>
                        <div class="flex justify-center">
                            <progress-ring stroke="3" radius="15" progress="0" time="${time}" hidden></progress-ring>
                        </div>
                    </div>
                </div>

                <div class="m-1 mt-auto p-0.5 border border-black w-fit hover:cursor-pointer">
                    <p class="text-sm">Reply</p>
                </div>
            </div>
        `;
    }
}

window.customElements.define('message-box', MessageBox);