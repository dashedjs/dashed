import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.borderRadius = '5';
    this.dashWidth = '1';
    this.dashLength = '6';
    this.dashSpacing = '0.9';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get borderRadius() {
    return this.getAttribute('border-radius');
  }
  set borderRadius(value) {
    this.setAttribute('border-radius', value);
  }

  get dashWidth() {
    return this.getAttribute('dash-width');
  }
  set dashWidth(value) {
    this.setAttribute('dash-width', value);
  }

  get dashLength() {
    return this.getAttribute('dash-length');
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    return this.getAttribute('dash-spacing');
  }
  set dashSpacing(value) {
    this.setAttribute('dash-spacing', value);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: 96px;
          min-height: 24px;
        }

        .input-container {
          display: inline-block;
          position: relative;

          border: ${this.dashWidth}px solid;
          border-image: ${borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.borderRadius)};
        }

        input {
          margin: 5px;
          padding: 5px;
          box-sizing: border-box;
          border: none;
          outline: none;
          height: 100%;
          background: var(--dashed-fill-color);
        }
      </style>
      <label for="input"><slot></slot></label>
      <div class="input-container">
        <input id="input" />
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-input', DashedInput);
