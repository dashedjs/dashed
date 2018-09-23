import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedRadio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.borderRadius = '12';
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
        }

        .radio-container {
          display: inline-block;
          position: relative;
          width: 24px;
          height: 24px;

          border: ${this.dashWidth}px solid;
          border-image: ${borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.borderRadius)};
        }

        .radio-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          border-radius: ${this.borderRadius}px;
          background: var(--dashed-primary-light-color);
        }

        input[type="radio"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
  
        svg.dash .inner-circle {
          fill: var(--dashed-danger-color);
        }

        input[type="radio"]:not(:checked) ~ svg.dash .inner-circle {
          opacity: 0;
        }

        input[type="radio"]:checked ~ svg.dash .inner-circle {
          opacity: 1;
        }
      </style>
      <div class="radio-container">
        <input type="radio" id="radio" />
        <svg class="dash">
          <circle class="inner-circle" cx="12" cy="12" r="5" />
        </svg>
      </svg>
      </div>
      <label for="radio"><slot></slot></label>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-radio', DashedRadio);
