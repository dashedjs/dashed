import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.dashWidth = '1.5';
    this.dashLength = '8';
    this.dashSpacing = '2';
  }

  static get properties() {
    return {
      disabled: Boolean,
      role: String,
      dashProps: Object
    };
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get role() {
    return this.getAttribute('role');
  }
  set role(value) {
    this.setAttribute('role', '');
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
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
          font-size: 16px;
        }

        :host(:hover) {
          color: var(--dashed-primary-color);
          --dashed-fill-color: var(--dashed-primary-light-color);
        }

        a {
          display: inline-block;
          cursor: inherit;
          text-align: center;
          text-decoration: none;
          color: inherit;
          outline: none;
          padding-bottom: 4px;
          font-size: inherit;
          position: relative;
          transition: color 50ms ease-in-out;

          border-bottom: ${this.dashWidth}px solid;
          border-image: ${borderImage(this.dashWidth, this.dashLength, this.dashSpacing)};
        }
      </style>
      <a href="#">
        <slot></slot>
      </a>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-link', DashedLink);
