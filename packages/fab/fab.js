import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedFab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.borderRadius = '24';
    this.dashWidth = '2';
    this.dashLength = '4';
    this.dashSpacing = '2';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get ariaLabel() {
    return this.hasAttribute('aria-label');
  }
  set ariaLabel(value) {
    Boolean(value) ? this.setAttribute('aria-label', value) : this.removeAttribute('aria-label');
  }

  get borderRadius() {
    return parseFloat(this.getAttribute('border-radius')) || 24;
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
    return parseFloat(this.getAttribute('dash-length')) || 4;
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    return parseFloat(this.getAttribute('dash-spacing')) || 2;
  }
  set dashSpacing(value) {
    this.setAttribute('dash-spacing', value);
  }

  get dashColor() {
    return this.shadowRoot.styleSheets[0].rules[0].style.getPropertyValue('--color-warn');
  }
  set dashColor(value) {
    this.setAttribute('dash-color', value);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const borderRadiusInner = `${parseFloat(this.borderRadius) - 4}`;

    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
        }

        :host(:hover) button {
          color: var(--color-danger);
        }

        .button-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 56px;
          height: 56px;
        }

        button {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
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
          box-sizing: border-box;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
          background: var(--color-primary-light);
          box-shadow: var(--shadow-6dp);
        }

        button::after {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          bottom: 4px;
          right: 4px;

          border: ${this.dashWidth}px solid;
          border-image: ${borderImage(
            this.dashWidth,
            this.dashLength,
            this.dashSpacing,
            this.dashColor,
            borderRadiusInner
          )};
        }
      </style>
      <div class="button-container">
        <button type="button" aria-label="${this.ariaLabel}">
          <slot name="icon"></slot>
        </button>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-fab', DashedFab);
