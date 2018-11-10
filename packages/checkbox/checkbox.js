import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get checked() {
    return this.hasAttribute('checked');
  }
  set checked(value) {
    Boolean(value) ? this.setAttribute('checked', '') : this.removeAttribute('checked');
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
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
      <style>
        :host {
          display: inline-block;
          position: relative;
          cursor: inherit;
          outline: none;
        }

        .checkbox-container {
          display: inline-block;
          position: relative;
          width: 24px;
          height: 24px;

          border: ${this.dashWidth}px solid;
          border-image: ${borderImage(
            this.dashWidth,
            this.dashLength,
            this.dashSpacing,
            this.dashColor,
            this.borderRadius
          )};
        }

        .checkbox-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
          background: var(--color-primary-light);
        }

        input[type="checkbox"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        svg.dash .checkmark {
          stroke: var(--color-danger);
          stroke-width: ${this.dashWidth * 1.8};
        }

        input[type="checkbox"]:not(:checked) ~ svg.dash .checkmark {
          opacity: 0;
        }

        input[type="checkbox"]:checked ~ svg.dash .checkmark {
          opacity: 1;
        }
      </style>
      <div class="checkbox-container">
        <input type="checkbox" id="checkbox" />
        <svg class="dash">
          <path class="checkmark" d='M6 12l4 4l8 -8' />
        </svg>
      </div>
      <label for="checkbox"><slot></slot></label>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-checkbox', DashedCheckbox);
