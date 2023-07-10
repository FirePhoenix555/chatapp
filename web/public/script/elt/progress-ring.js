// https://css-tricks.com/building-progress-ring-quickly/

class ProgressRing extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({mode: 'open'});
    }

    setProgress(percent) {
        const offset = this._circumference - (percent * this._circumference);
        const circle = this._root.querySelector('circle');
        circle.style.strokeDashoffset = offset;

        setTimeout(() => { // on load completion
            let p = this.parentElement.parentElement.parentElement.parentElement.parentElement;
            p.delete();
        }, this.time * 1000);
    }

    // thank you stackoverflow!!
    // https://stackoverflow.com/questions/69997841/this-getattributeattribute-returning-null-even-though-attributes-showing-in
    connectedCallback() {
        const stroke = this.getAttribute('stroke') || 1;
        const radius = this.getAttribute('radius') || 30;
        const strokeColor = this.getAttribute('stroke-color') || "black";
        this.time = this.getAttribute('time') || 1; // in seconds

        const normalizedRadius = radius - stroke * 2;
        this._circumference = normalizedRadius * 2 * Math.PI;

        this.style.width = (radius * 2) + "px";
        this.style.height = (radius * 2) + "px";

        this._root.innerHTML = `
            <svg
                height="${radius * 2}"
                width="${radius * 2}"
            >
                <circle
                    stroke="${strokeColor}"
                    stroke-dasharray="${this._circumference} ${this._circumference}"
                    style="stroke-dashoffset:${this._circumference}"
                    stroke-width="${stroke}"
                    fill="transparent"
                    r="${normalizedRadius}"
                    cx="${radius}"
                    cy="${radius}"
                />
            </svg>

            <style>
                circle {
                    transition: stroke-dashoffset ${this.time}s;
                    transform: rotate(-90deg);
                    transform-origin: 50% 50%;
                }
            </style>
        `;
    }
}

window.customElements.define('progress-ring', ProgressRing);