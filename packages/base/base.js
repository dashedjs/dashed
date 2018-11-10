import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  get disabled() {
    return this.hasAttribute('disabled') || false;
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get rounded() {
    return this.hasAttribute('rounded') || false;
  }
  set rounded(value) {
    Boolean(value) ? this.setAttribute('rounded', '') : this.removeAttribute('rounded');
  }

  get borderRadius() {
    return parseFloat(this.getAttribute('border-radius')) || 0;
  }
  set borderRadius(value) {
    this.setAttribute('border-radius', value);
  }

  get dashWidth() {
    return parseFloat(this.getAttribute('dash-width')) || 2;
  }
  set dashWidth(value) {
    this.setAttribute('dash-width', value);
  }

  get dashLength() {
    return parseFloat(this.getAttribute('dash-length')) || 8;
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    return parseFloat(this.getAttribute('dash-spacing')) || 2.4;
  }
  set dashSpacing(value) {
    this.setAttribute('dash-spacing', value);
  }

  get dashColor() {
    const colorAttrList = ['primary', 'secondary', 'success', 'danger', 'warn'];
    const colorAttr = this.getAttribute('dash-color') ? this.getAttribute('dash-color') : 'primary';
    if (colorAttrList.includes(colorAttr)) {
      // hack since CSS variables are not supported inside an svg borderImage
      // const colorValueRegex = new RegExp(`--color-${colorAttr}\: (\#*\\w+);`);
      // const colorValue = dashedStyles.match(colorValueRegex)[1];
      // return colorValue;

      return `var(--color-${colorAttr})`;
    }
    return colorAttr;
  }
  set dashColor(value) {
    this.setAttribute('dash-color', value);
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['border-radius', 'rounded', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  attributeChangedCallback(oldvalue, newValue, attribute) {
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
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

          border: ${this.dashWidth}px solid;
          border-image: ${borderImage(
            this.dashWidth,
            this.dashLength,
            this.dashSpacing,
            this.dashColor,
            this.borderRadius
          )};
        }

        button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
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
customElements.define('dashed-base', DashedBase);
