import { DashedBase, borderImage, sharedStyles } from '@dashedjs/dashed-base/base.js';

export class DashedButton extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['rounded', 'border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  get rounded() {
    return this.hasAttribute('rounded') || false;
  }
  set rounded(value) {
    Boolean(value) ? this.setAttribute('rounded', '') : this.removeAttribute('rounded');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this.render();
  }

  render() {
    const [borderRadius = 0, dashWidth = 2, dashLength = 8, dashSpacing = 2.4] = [
      this.borderRadius,
      this.dashWidth,
      this.dashLength,
      this.dashSpacing
    ].map(attr => (attr ? parseFloat(attr) : undefined));
    const dashColor = this.dashColor.replace('#', '%23'); // Using unescaped '#' characters in a data URI body is deprecated

    const template = document.createElement('template');
    template.innerHTML = `
      ${sharedStyles}
      <style>
        :host {
          --padding: 4px 12px;
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
        }

        :host(:hover) {
          --color-fill: var(--color-primary-light);
        }

        button {
          min-width: 48px;
          min-height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          color: inherit;
          outline: none;
          padding: var(--padding);
          font-size: inherit;
          position: relative;
          transition: color 50ms ease-in-out;

          border: ${dashWidth}px solid;
          border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
        }

        button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${borderRadius}px;
          background: var(--color-primary-light);
        }

        :host ::slotted([slot="icon"]) {
          stroke: currentColor;
          padding-right: 4px;
        }
      </style>
      <button type="button">
        <slot name="icon"></slot>
        <slot></slot>
      </button>
    `;
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-button', DashedButton);
