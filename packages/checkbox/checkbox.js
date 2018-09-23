import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.dashProps = { dashWidth: 2, dashLength: 4, dashRatio: 0.5 };
    this.borderRadius = '0';
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

  get checked() {
    return this.hasAttribute('checked');
  }
  set checked(value) {
    Boolean(value) ? this.setAttribute('checked', '') : this.removeAttribute('checked');
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
          border-image: ${borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.borderRadius)};
        }

        .checkbox-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
          background: var(--dashed-primary-light-color);
        }

        input[type="checkbox"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        svg.dash .checkmark {
          stroke: var(--dashed-danger-color);
          stroke-width: ${parseFloat(this.dashWidth) * 1.8};
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
